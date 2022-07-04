import express from 'express';
import {
    createCustomer, 
    findCustomerById, 
    listAllCustomers, 
    updateCustomerById,
    deleteCustomerById,
} from '../controllers/customer.controller.js';

const router = express.Router();

router.post('/customer', createCustomer);
router.get('/customers', listAllCustomers);
router.get('/customer/:id', findCustomerById);
router.put('/customer/:id', updateCustomerById);
router.delete('/customer/:id', deleteCustomerById);

export default router;