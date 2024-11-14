import {createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer} from '../controllers/customerController.js'
    
import { Router } from 'express';

const router = Router();

router.post('/', createCustomer);
router.get('/', getAllCustomer);
router.get('/:customerId', getCustomerById);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

export default router;