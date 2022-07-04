import {query} from '../config/database.js';

// Create a new customer
const createCustomer = async (req, res) => {
    const {name, phone1, phone2} = req.body;

    // Check if customer already exist and return a messagem
    const user = await query(
        "SELECT * FROM fonelight.customers WHERE nome = $1",
        [name],
    );

    if (user.rowCount > 0) {
        res.status(409).send({
            message: "User already exist",
        })
        return;
    }

    // Create customer
    const response = await query(
        "INSERT INTO fonelight.customers (nome, phone1, phone2) VALUES($1, $2, $3)",
        [name.toUpperCase(), phone1, phone2],
    );

    res.status(200).json({
        message: 'Customer added successfully!',
        body: {
            user: {
                name,
                phone1,
                phone2,
            }
        }
    });
};

const listAllCustomers = async (req, res) => {
    const response = await query(
        'SELECT * FROM fonelight.customers ORDER BY nome ASC'
    );
    res.status(200).send(response.rows);
};

const findCustomerById = async (req, res) => {
    const customerId = parseInt(req.params.id);
    const response = await query(
        'SELECT * FROM fonelight.customers WHERE id = $1', [customerId],
    );

    if (response.rowCount === 0) {
        return res.status(400).send({
            message: "User not found",
        }).end();
    }
    res.status(200).send(response.rows);
};

const updateCustomerById = async (req, res) => {
    const customerId = parseInt(req.params.id);
    const {name, phone1, phone2} = req.body;

    const response = await query(
        'UPDATE fonelight.customers SET nome = $1, phone1 = $2, phone2 = $3 WHERE id = $4',
        [name, phone1, phone2, customerId],
    );

    res.status(200).send({
        message: 'Customer updated successfully!',
    });
};

const deleteCustomerById = async (req, res) => {
    const customerId = parseInt(req.params.id);
    const response = await query(
        'DELETE FROM fonelight.customers WHERE id = $1',
        [customerId],
    );
    res.status(200).send({
        message: 'Customer deleted successfully!',
        customerId,
    })
};


export {
    createCustomer,
    listAllCustomers,
    findCustomerById,
    updateCustomerById,
    deleteCustomerById,
};