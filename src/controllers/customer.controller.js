import {query} from '../config/database.js';

const createCustomer = async (req, res) => {
    const {name, phone1, phone2} = req.body;
    const {rows} = await query(
        "INSERT INTO fonelight.customers (nome, phone1, phone2) VALUES($1, $2, $3)",
        [name, phone1, phone2],
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
}

const findCustomerById = async (req, res) => {
    const customerId = parseInt(req.params.id);
    const response = await query(
        'SELECT * FROM fonelight.customers WHERE id = $1', [customerId],
    );
    res.status(200).send(response.rows);
}

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
}

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
}


export {
    createCustomer,
    listAllCustomers,
    findCustomerById,
    updateCustomerById,
    deleteCustomerById,
};