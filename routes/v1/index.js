const express = require('express');
const router = express.Router();

const mainController = require('../../controllers/mainController');

router.get('/', mainController.getAll);
router.get('/:id', mainController.getById);

module.exports = router;
