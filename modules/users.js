const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/paginator",{
    UseUnifiedTopology: true
})

var conn = mongoose.connection;

const employeeSchema = new mongoose.Schema({
    city : String,
    loc: [{0:Number, 1:Number}],
    pop : Number,
    state : String
})

var employeeModel = mongoose.model("user", employeeSchema);
module.exports = employeeModel;