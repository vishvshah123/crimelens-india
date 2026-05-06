const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema(
  {
    crime_id: { type: String, required: true, unique: true },
    crime_type: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    severity: { type: String, required: true, enum: ['Low', 'Medium', 'High', 'Unknown'] },
    latitude: { type: String },
    longitude: { type: String },
    resolved: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Crime = mongoose.model('Crime', crimeSchema);

module.exports = Crime;
