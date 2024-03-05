const mongoose = require("mongoose")
const CommentSchema = new mongoose.Schema ({
    Comment: {
        type: String,
        required: true 
    },
    Date: {
        type: Date,
        default: new Date()
    },
    TicketID: {
        type:String,
        required: true
    }, 
    Submitted: {
        type: String,
        required: true
    }, 
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Comment", CommentSchema) 