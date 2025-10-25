import { supabase } from './supabaseClient'

export const shopService = {
  async getAllShops() {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getShopById(id) {
    const { data, error } = await supabase
      .from('shops')
      .select(`
        *,
        products (*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getShopsByCategory(category) {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('category', category)
    
    if (error) throw error
    return data
  },

  async searchShops(query) {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .textSearch('name', query)
    
    if (error) throw error
    return data
  }
}