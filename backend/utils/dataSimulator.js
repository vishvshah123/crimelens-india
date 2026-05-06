const Crime = require('../models/Crime');
const sampleData = require('../../dataset/sample_crime_data.json');

const simulateData = async () => {
    console.log('Starting Cloud Data Simulation (Big Data Mock)...');
    
    setInterval(async () => {
        try {
            const randomRecord = sampleData[Math.floor(Math.random() * sampleData.length)];
            
            const newCrime = new Crime({
                ...randomRecord,
                crime_id: `FIR-${Math.floor(Math.random() * 900000) + 100000}`,
                date: new Date()
            });
            
            await newCrime.save();
            console.log(`[Simulated] New FIR saved: ${newCrime.crime_id}`);
            
            // Keep DB clean - delete old records if count > 500
            const count = await Crime.countDocuments();
            if (count > 500) {
                await Crime.find().sort({createdAt: 1}).limit(50).then(docs => {
                    docs.forEach(doc => doc.deleteOne());
                });
            }
        } catch (err) {
            console.error('Simulation error:', err.message);
        }
    }, 5000); // New record every 5 seconds
};

module.exports = simulateData;
