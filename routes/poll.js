const express = require("express");
var router = express.Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/vote');
var pusher = new Pusher({
    appId: '528453',
    key: '944b45bac1491aa7166f',
    secret: 'bc7b1615c84ea887d9be',
    cluster: 'ap2',
    encrypted: true
});

router.get('/' , (req , res) => {
    Vote.find().then(votes => res.json({success: true , votes: votes}));
});

router.post('/' , (req , res) => {
    const newVote = {
        anime: req.body.anime,
        points: 1
    }
    
    new Vote(newVote).save().then(vote => {
        pusher.trigger('anime-poll', 'anime-vote', {
            points: parseInt(vote.points),
            anime: req.body.anime
        });
        return res.json({success: true , message: "thank you for voting"});
    });

});

module.exports = router;