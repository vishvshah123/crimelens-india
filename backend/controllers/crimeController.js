const Crime = require('../models/Crime');

// @desc    Get all crimes
// @route   GET /api/crimes
const getCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find({}).sort({ date: -1 }).limit(100);
    res.json(crimes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get crime analytics (count by type, city, severity)
// @route   GET /api/crimes/analytics
const getAnalytics = async (req, res) => {
  try {
    const typeDistribution = await Crime.aggregate([
      { $group: { _id: '$crime_type', count: { $sum: 1 } } }
    ]);
    
    const cityDistribution = await Crime.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } }
    ]);
    
    const severityDistribution = await Crime.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);
    
    const totalCrimes = await Crime.countDocuments();
    
    res.json({
      totalCrimes,
      typeDistribution,
      cityDistribution,
      severityDistribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new crime
// @route   POST /api/crimes
const addCrime = async (req, res) => {
  try {
    const crime = new Crime(req.body);
    const createdCrime = await crime.save();
    res.status(201).json(createdCrime);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = {
  getCrimes,
  getAnalytics,
  addCrime
};
