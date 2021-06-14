const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get
router.get('/', (req, res) => {
        res.send('<b>hello</b>');
});

// Add


// Delete


module.exports = router;