const express = require("express");
var router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '528453',
    key: '944b45bac1491aa7166f',
    secret: 'bc7b1615c84ea887d9be',
    cluster: 'ap2',
    encrypted: true
});

router.get('/' , (req , res) => {
    res.send('hey there!!!! yo man');
});

router.post('/' , (req , res) => {
    pusher.trigger('anime-poll', 'anime-vote', {
        points: 1,
        anime: req.body.anime
    });
    return res.json({success: true , message: "thank you for voting"});
});

module.exports = router;