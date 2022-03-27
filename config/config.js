const mongoose = require("mongoose");
exports.connectDB = async () => {
 await mongoose
    .connect("mongodb://localhost:27017/netlink")
    .then((con) => console.log("Database Connected"));
};
