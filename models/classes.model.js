const mongoose =  require('mongoose');

const classesSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    teacher: { type: String, required: true },
    teacherid: { type: String, required: true },
    subject: { type: String, required: true },
    grade: { type: Number, required: true },
    fee: { type: Number, required: true },
    medium: { type: String, required: true, enum: ['english', 'sinhala', 'tamil']},
    day: { type: String, required: true, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    time: {
        from: { type: String, required: true },  // 'HH:mm' format
        to: { type: String, required: true }     // 'HH:mm' format
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('classes', classesSchema);

