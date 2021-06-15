const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get
router.get('/', async (req, res) => {
        const messages = await loadCollection();
        res.send(await messages.find({}).toArray());
});

// Add
router.post('/', async (req, res) => {
        const messages = await loadCollection();
        await messages.insertOne({
                text: req.body.text,
                createdAt: new Date()
        });
        res.status(201).send();
});

// Update
router.put('/:id', async (req, res) => {
        const messages = await loadCollection();
        const current = { _id: new mongodb.ObjectID (req.params.id) };
        const update = { $set: { text: req.body.text } };
        await messages.updateOne(current, update);
        res.status(201).send();
});

// Delete
router.delete('/:id', async (req, res) => {
        const messages = await loadCollection();
        await messages.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send();
});

async function loadCollection(){
        const client = await mongodb.MongoClient.connect
        ('mongodb+srv://admin:admin@main.llv7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
                useUnifiedTopology: true
        });

        return client.db('vue_node').collection('messages');
}

module.exports = router;