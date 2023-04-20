const express = require('express');

const router = express.Router();

const User = require('../model/user');
const Search = require('../model/search');

//Post Method
router.post('/create_user', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        const data = new User({
            uid: req.body.uid,
            name: req.body.name,
            authProvider: req.body.authProvider,
            email: req.body.email
        });
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    } else {
        res.status(200).json(user)
    }
});

router.post('/create_search', async (req, res) => {
    const data = new Search({
        query: req.body.query,
        created_at: req.body.created_at
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.post('/get_search_records', async (req, res) => {
    const data = await Search.find({created_at: { $lte: req.body.enddate, $gte: req.body.startdate }});
    res.status(200).json(data);
});

module.exports = router;