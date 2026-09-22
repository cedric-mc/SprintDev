const express = require('express')
const asyncHandler = require('../middleware/asyncHandler')
const controller = require('../controllers/signalements')

const router = express.Router()

router.get('/', asyncHandler(controller.list))
router.get('/:id', asyncHandler(controller.getById))
router.post('/', controller.upload.single('photo'), asyncHandler(controller.create))
router.patch('/:id/statut', asyncHandler(controller.updateStatus))
router.delete('/:id', asyncHandler(controller.remove))

module.exports = router