const express = require('express');
const router = express.Router();
const debtsCtrl = require('../../controllers/debts');

// Protected Routes
router.use(require('../../config/auth'));
router.get('/', checkAuth, debtsCtrl.showDebts);
router.post('/', checkAuth, debtsCtrl.createDebt);
router.delete('/', checkAuth, debtsCtrl.deleteDebt);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;