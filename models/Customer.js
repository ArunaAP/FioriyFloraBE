import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }

},{timestamps: true});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;