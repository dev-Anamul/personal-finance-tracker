const router = require('express').Router();
const authenticate = require('../../middleware/authenticate');
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const goalRoutes = require('./goal');
const transactionRoutes = require('./transaction');
const budgetRoutes = require('./budget');

// use the router
router.use('/auth', authRoutes);
router.use('/categories', authenticate, categoryRoutes);
router.use('/goals', authenticate, goalRoutes);
router.use('/transactions', authenticate, transactionRoutes);
router.use('/budgets', authenticate, budgetRoutes);

// export the router
module.exports = router;
