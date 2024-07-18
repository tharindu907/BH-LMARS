const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.URI); 
        console.log('Database Connection Successfull');
    }
    catch (err) {
        console.log(`Database Connection Unsuccessfull: ${err}`);
    }
}

module.exports = dbConnect;