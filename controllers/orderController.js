import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import Flower from '../models/Flower.js';  // Import Flower model if needed to validate flower items

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerId, orderItems, courierCharge } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(customerId);   
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Validate and calculate total amount
    let totalAmount = courierCharge;
    for (let item of orderItems) {
      const flower = await Flower.findById(item.flowerId);  // Validate each flowerId
      if (!flower) {
        return res.status(400).json({ error: `Flower with ID ${item.flowerId} not found` });
      }
      totalAmount += item.price * item.quantity;
    }

    const order = new Order({
      customerId,
      orderItems,
      courierCharge,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId'); // Populates customer details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate order status input
    const validStatuses = ['Pending', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('customerId', 'name email').populate('orderItems.flowerId', 'name price species');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById
};
