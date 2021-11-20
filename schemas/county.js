const mongoose = require("mongoose");

//schema for storing the counties in mongodb
const countySchema = new mongoose.Schema({
	name: {
        type: String,
        unique: true,
        required: true
    },
    temperature: {
        type: String,
        unique: false,
        required: true
    },
    pH: {
        type: String,
        unique: false,
        required: true
    },
    dissolved_oxygen: {
        type: String,
        unique: false,
        required: true
    },
    suspended_sediment: {
        type: String,
        unique: false,
        required: true
    },
    specific_conductance: {
        type: String,
        unique: false,
        required: true
    }
});
const County = mongoose.model("County", countySchema);

module.exports = { County };