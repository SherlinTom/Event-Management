const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    event_name : {
        type: String,
        required: [true,"Please enter Name of Event "]
    },
    description: {
        type: String,
        required: [true,"Please enter Event Details"]
    },
    event_date: {
        type: Date,
        required: [true,"Please enter Event Date"]
    },
    location: {
        type: String,
        required: [true,"Please enter Venue of Event"]
    },
    category: {
        type: String,
        required: [true, "Please enter Event Category"]
    },
    user_id: {
        type: String
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled'],
        default: 'upcoming'
    }
  
});

const Event = mongoose.model('event',eventSchema);
module.exports = Event;
