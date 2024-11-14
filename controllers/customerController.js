import Customer from '../models/Customer.js'

//Create new Customer
const createCustomer = async(req, res) =>{
    try{
        const customer = new Customer(req.body);
        await customer.save();

        res.status(201).json({message: 'Customer created', customer});
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const getAllCustomer = async (req, res)=>{
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

// Get customer by ID
const getCustomerById = async (req, res) => {
    try {
      const { customerId } = req.params;
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update customer details
  const updateCustomer = async (req, res) => {
    try {
      const { customerId } = req.params;
      const { name, email, phone, address, location } = req.body;
  
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { name, email, phone, address, location },
        { new: true }
      );
  
      res.status(200).json({ message: 'Customer details updated', customer });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete customer
  const deleteCustomer = async (req, res) => {
    try {
      const { customerId } = req.params;
  
      const customer = await Customer.findByIdAndDelete(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export{
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}