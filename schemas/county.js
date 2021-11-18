const mongoose = require("mongoose");

const countySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
	name: {
        type: String,
        unique: true,
        required: true
    },
    temperature: {
        type: mongoose.Schema.Types.Decimal128,
        unique: false,
        required: true
    },
    pH: {
        type: mongoose.Schema.Types.Decimal128,
        unique: false,
        required: true
    },
    dissolved_oxygen: {
        type: mongoose.Schema.Types.Decimal128,
        unique: false,
        required: true
    },
    suspended_sediment: {
        type: mongoose.Schema.Types.Decimal128,
        unique: false,
        required: true
    },
    specific_conductance: {
        type: mongoose.Schema.Types.Decimal128,
        unique: false,
        required: true
    }
});

module.exports = mongoose.model('County', countySchema);