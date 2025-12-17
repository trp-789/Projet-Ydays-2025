import express from 'express'
import cartController from '../controllers/cartController.js'

const router = express.Router()

router.get('/', cartController.getCart)
router.post('/merge', cartController.mergeCart)
router.post('/', cartController.upsertCart)
router.post('/items', cartController.addOrUpdateItem)
router.patch('/items/:id', cartController.updateItem)
router.delete('/items/:id', cartController.removeItem)

export default router
