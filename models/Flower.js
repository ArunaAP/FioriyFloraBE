import mongoose from "mongoose";

const FlowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  buyingPrice: { 
    type: Number, 
    required: true 
},
  sellingPrice: { 
    type: Number, 
    required: true 
},
  species: { 
    type: String, 
    required: true 
},
  availableStock: {
    type: Number, 
    required: true }
}, { timestamps: true });

const Flower = mongoose.model('Flower', FlowerSchema);

export default Flower;
