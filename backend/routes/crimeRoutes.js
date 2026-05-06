const express = require('express');
const router = express.Router();
const { getCrimes, getAnalytics, addCrime } = require('../controllers/crimeController');

router.route('/').get(getCrimes).post(addCrime);
router.route('/analytics').get(getAnalytics);

module.exports = router;
