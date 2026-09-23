const express = require('express')
const asyncHandler = require('../middleware/asyncHandler')
const controller = require('../controllers/signalements')
const { verifyToken, requireAgent } = require('../middleware/auth')

const router = express.Router()

router.get('/', asyncHandler(controller.list))
router.get('/:id', asyncHandler(controller.getById))
router.post('/', controller.uploadPhoto, controller.validateCreation, asyncHandler(controller.create))
router.patch('/:id/statut', verifyToken, requireAgent, asyncHandler(controller.updateStatus))
router.delete('/:id', asyncHandler(controller.remove))

module.exports = router
