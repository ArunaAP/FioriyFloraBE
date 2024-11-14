import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
    orderItems: [
        {
            flowerId: { // Use flowerId instead of flowerType
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Flower',  // Assuming you have a Flower model
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    courierCharge: {
        type: Number,
        reuired: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'Pending'
    }

}, {timestamps: true})

const Order = mongoose.model('Order', OrderSchema);

export default Order;