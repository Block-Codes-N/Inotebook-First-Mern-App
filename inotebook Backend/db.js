const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/Block_Code?directConnection=true';

const connectToMongo = () => {

    mongoose.connect(mongoURI)
    .then(console.log('Mongo  was Connect Successfully'))    
}

module.exports = connectToMongo;