const mongoose =  require('mongoose');

const classesSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true
    },
    teacherid: { 
        type: String, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    grade: { 
        type: Number, 
        required: true 
    },
    fee: { 
        type: Number, 
        required: true 
    },
    medium: { 
        type: String, 
        required: true, 
        enum: ['English', 'Sinhala', 'Tamil']
    },
    schedule: [{
        day: { 
            type: String, 
            required: true, 
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
        },
        from: { type: String, required: true },  // "0830"
        to: { type: String, required: true }     
    }],
    registered_date: {
        type: Date,
        required: true
    },
    registered_by: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('classes', classesSchema);

