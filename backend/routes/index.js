import express from 'express'
import productsRouter from './products.js'
import shopsRouter from './shops.js'

const router = express.Router()

router.use('/products', productsRouter)
router.use('/shops', shopsRouter)


export default router
