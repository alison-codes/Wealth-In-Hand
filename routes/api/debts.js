const express = require('express');
const router = express.Router();
const debtsCtrl = require('../../controllers/debts');

router.get('/', debtsCtrl.showDebts);

module.exports = router;