const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        dafault: Date.now
    }
});

const Person = module.exports = mongoose.model('person', personSchema);
module.exports.get = function(callback, limit){
    Person.find(callback, limit);
}