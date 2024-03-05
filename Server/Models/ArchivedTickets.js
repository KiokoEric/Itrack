const mongoose = require("mongoose")
const ArchiveSchema = new mongoose.Schema ({ 
    Title: {
        type: String,
        required: true
    },
    Projects: {
        type: String,
        required: true  
    },
    Description: {
        type: String, 
        required: true 
    },
    Category: {
        type: String,
        required: true
    },
    Priority: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    }, 
    Submitted: {
        type: String,
        required: true
    }, 
    ID: {
        type:String,
        required: true
    }, 
    Date: {
        type: Date,
        default: Date.now 
    }, 
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true  
    }
})

module.exports = mongoose.model("ArchivedTickets", ArchiveSchema)  