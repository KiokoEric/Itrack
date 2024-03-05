const mongoose = require("mongoose")
const ArchivedProjectSchema = new mongoose.Schema ({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true 
    },
    StartDate: {
        type: String,
        required: true 
    },
    Priority: {
        type: String,
        required: true
    },
    EndDate: {
        type: String,
        required: true
    }, 
    Manager: {
        type: String,
        required: true 
    }, 
    Assigned:[{
        type: Array,
    }], 
    Image: {
        type: String
    }, 
    Date: {
        type: Date,
        default: Date.now,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
})

module.exports = mongoose.model("ArchivedProjects", ArchivedProjectSchema)