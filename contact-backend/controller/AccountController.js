const Accounts = require('../models/AccountModel'); // Adjust the path to your actual model
const Tags = require('../models/tagModel');
// Create a new account
const createAccount = async (req, res) => {
    try {
        const account = new Accounts(req.body);
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Accounts.find().populate({ path: 'tags', model: 'Tags' }); // Adjust populate as needed
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single account by ID
const getAccountById = async (req, res) => {
    try {
        const account = await Accounts.findById(req.params.id).populate({ path: 'tags', model: 'Tags' }); // Adjust populate as needed
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an account by ID
const updateAccount = async (req, res) => {
    try {
        const account = await Accounts.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate({ path: 'tags', model: 'Tags' }); // Adjust populate as needed
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an account by ID
const deleteAccount = async (req, res) => {
    try {
        const account = await Accounts.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
};
