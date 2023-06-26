const mongoose = require('mongoose');


const connect = (url) => {
    mongoose.connect(url || 'mongodb://127.0.0.1:27017/sxzQuare')

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connect
};