import supabase from '../supabaseClient.js'

// Récupère l'utilisateur à partir du header Authorization: Bearer <token>
async function getUserFromHeader(req) {
  const auth = req.headers.authorization || ''
  const token = auth.split(' ')[1]
  if (!token) return { error: 'Missing token' }

  try {
    const { data, error } = await supabase.auth.getUser(token)
    if (error) return { error }
    return { user: data.user }
  } catch (err) {
    return { error: err }
  }
}

export const getCart = async (req, res) => {
  const { user, error } = await getUserFromHeader(req)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const { data: cart } = await supabase.from('carts').select('*').eq('user_id', user.id).maybeSingle()
    if (!cart) return res.json({ items: [] })

    const { data: items } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id)
    return res.json({ items: items || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

// Merge: reçoit un tableau d'items depuis le client (guest local) et fusionne avec le serveur
export const mergeCart = async (req, res) => {
  const { user, error } = await getUserFromHeader(req)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })

  const incomingItems = req.body.items || []

  try {
    // ensure cart exists
    let { data: cart } = await supabase.from('carts').select('*').eq('user_id', user.id).maybeSingle()
    if (!cart) {
      const { data } = await supabase.from('carts').insert({ user_id: user.id }).select().single()
      cart = data
    }

    // For each incoming item, upsert quantity by product
    for (const it of incomingItems) {
      const productId = it.product_id
      const qty = parseInt(it.quantity) || 1

      // fetch product price for safety
      const { data: prod } = await supabase.from('products').select('price, name, image').eq('id', productId).maybeSingle()
      const unit_price = prod?.price ?? (it.unit_price || 0)

      // check existing
      const { data: existing } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id).eq('product_id', productId).maybeSingle()
      if (existing) {
        await supabase.from('cart_items').update({ quantity: existing.quantity + qty, unit_price }).eq('id', existing.id)
      } else {
        await supabase.from('cart_items').insert({ cart_id: cart.id, product_id: productId, quantity: qty, unit_price, product_name: prod?.name, product_image: prod?.image })
      }
    }

    const { data: items } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id)
    return res.json({ items: items || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const upsertCart = async (req, res) => {
  const { user, error } = await getUserFromHeader(req)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })

  const items = req.body.items || []

  try {
    let { data: cart } = await supabase.from('carts').select('*').eq('user_id', user.id).maybeSingle()
    if (!cart) {
      const { data } = await supabase.from('carts').insert({ user_id: user.id }).select().single()
      cart = data
    }

    // Simplest approach: delete existing and insert provided
    await supabase.from('cart_items').delete().eq('cart_id', cart.id)

    const toInsert = []
    for (const it of items) {
      const productId = it.product_id
      const qty = parseInt(it.quantity) || 1
      const { data: prod } = await supabase.from('products').select('price, name, image').eq('id', productId).maybeSingle()
      const unit_price = prod?.price ?? (it.unit_price || 0)
      toInsert.push({ cart_id: cart.id, product_id: productId, quantity: qty, unit_price, product_name: prod?.name, product_image: prod?.image })
    }

    if (toInsert.length) {
      await supabase.from('cart_items').insert(toInsert)
    }

    const { data: itemsAfter } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id)
    return res.json({ items: itemsAfter || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const addOrUpdateItem = async (req, res) => {
  const { user, error } = await getUserFromHeader(req)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })

  const { product_id, quantity = 1 } = req.body
  if (!product_id) return res.status(400).json({ error: 'Missing product_id' })

  try {
    let { data: cart } = await supabase.from('carts').select('*').eq('user_id', user.id).maybeSingle()
    if (!cart) {
      const { data } = await supabase.from('carts').insert({ user_id: user.id }).select().single()
      cart = data
    }

    const { data: prod } = await supabase.from('products').select('price, name, image').eq('id', product_id).maybeSingle()
    const unit_price = prod?.price ?? 0

    const { data: existing } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id).eq('product_id', product_id).maybeSingle()
    if (existing) {
      await supabase.from('cart_items').update({ quantity }).eq('id', existing.id)
      const { data: updated } = await supabase.from('cart_items').select('*').eq('id', existing.id).maybeSingle()
      return res.json({ item: updated })
    }

    const { data: inserted } = await supabase.from('cart_items').insert({ cart_id: cart.id, product_id, quantity, unit_price, product_name: prod?.name, product_image: prod?.image }).select().single()
    return res.json({ item: inserted })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const updateItem = async (req, res) => {
  const { user, error } = await getUserFromHeader(req)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })
  const { id } = req.params
  const { quantity } = req.body
  try {
    await supabase.from('cart_items').update({ quantity }).eq('id', id)
    const { data } = await supabase.from('cart_items').select('*').eq('id', id).maybeSingle()
    return res.json({ item: data })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const removeItem = async (req, res) => {
  const { user, error } = await getUserFromHeader(req)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })
  const { id } = req.params
  try {
    await supabase.from('cart_items').delete().eq('id', id)
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export default {
  getCart,
  mergeCart,
  upsertCart,
  addOrUpdateItem,
  updateItem,
  removeItem
}
