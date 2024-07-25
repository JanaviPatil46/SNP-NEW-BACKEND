const express = require('express');
const router = express.Router();
const accountsController = require('../controller/AccountController'); // Adjust the path to your actual controller

// Create a new account
router.post('/', accountsController.createAccount);

// Get all accounts
router.get('/', accountsController.getAllAccounts);

// Get a single account by ID
router.get('/:id', accountsController.getAccountById);

// Update an account by ID
router.put('/:id', accountsController.updateAccount);

// Delete an account by ID
router.delete('/:id', accountsController.deleteAccount);

module.exports = router;
