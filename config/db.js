const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://rupesh:gokussj10@ds229690.mlab.com:29690/pusherpoll')
.then(() => console.log('mongoDB connected'))
.catch(err => console.log(err));