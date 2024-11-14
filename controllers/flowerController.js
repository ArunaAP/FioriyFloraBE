import Flower from '../models/Flower.js'

// Create a new flower
const createFlower = async (req, res) => {
  try {
    const { name, buyingPrice, sellingPrice, species, availableStock } = req.body;

    const flower = new Flower({
      name,
      buyingPrice,
      sellingPrice,
      species,
      availableStock,
    });

    await flower.save();
    res.status(201).json({ message: 'Flower created', flower });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all flowers
const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.status(200).json(flowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update flower details (price, stock)
const updateFlower = async (req, res) => {
  try {
    const { flowerId } = req.params;
    const { name, buyingPrice, sellingPrice, species, availableStock } = req.body;

    const flower = await Flower.findByIdAndUpdate(
      flowerId,
      { name, buyingPrice, sellingPrice, species, availableStock },
      { new: true }
    );

    if (!flower) {
      // If flower is not found, return a 404 error
      return res.status(404).json({ message: 'Flower not found' });
    }

    res.status(200).json({ message: 'Flower details updated', flower });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get flower by ID
const getFlowerById = async (req, res) => {
  try {
    const { flowerId } = req.params;
    const flower = await Flower.findById(flowerId);
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    res.status(200).json(flower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete flower
const deleteFlower = async (req, res) => {
  try {
    const { flowerId } = req.params;

    const flower = await Flower.findByIdAndDelete(flowerId);
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }

    res.status(200).json({ message: 'Flower deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
    createFlower,
    getFlowers,
    updateFlower,
    getFlowerById,
    deleteFlower
}