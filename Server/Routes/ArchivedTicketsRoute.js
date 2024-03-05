const express = require('express');
const jwt = require("jsonwebtoken");
const ArchiveRoute = express.Router();
const Issue = require("../Models/Issues");
const Archive = require("../Models/ArchivedTickets");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser"); 

const myPassword = process.env.Password

ArchiveRoute.use(cookieParser())
dotenv.config();

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, myPassword, (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

ArchiveRoute.post("/AddArchive", verifyToken ,async (req, res) => { 
    const Archives = new Archive(req.body)

    try {
        const SavedArchives = await Archives.save() 
        res.send(SavedArchives)
    } catch (error) {
        console.error(error)
    }
})

ArchiveRoute.get("/Archives", async (req, res) => { 
    try{
        const AllArchives = await Archive.find() 
        res.json(AllArchives)
    }
    catch(err) { 
        res.send(err)  
    }
})

ArchiveRoute.get("/ArchivesLength", async (req, res) => { 
    try{
        const AllArchives = await Archive.find()  
        const ArrayLength = AllArchives.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

ArchiveRoute.get('/:id', async (req, res) => {
    try {
    const Issues = await Archive.findById(req.params.id);
    if (!Issues) {
        return res.status(404).json({ message: 'Issues not found' });
    }
    res.json(Issues);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});


ArchiveRoute.delete("/:id", async (req, res) => {
    try{
        const Issues = await Archive.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

ArchiveRoute.post('/moveTicket/:ticketId', async (req, res) => { 
    const { ticketId } = req.params;
    
    try {
        // Find the ticket in the source model
        const Archives = await Archive.findById(ticketId);
    
        // Create a new ticket in the destination model
        const Issues = new Issue({
            Title: Archives.Title,
            Projects: Archives.Projects,
            Description: Archives.Description, 
            Category: Archives.Category,
            Priority: Archives.Priority,
            Status: Archives.Status,
            Submitted: Archives.Submitted,
            Date: Archives.Date,
            userOwner: Archives.userOwner 
        });
    
        // Save the new ticket in the destination model
        await Issues.save();
    
        // Remove the ticket from the source model
        await Archive.findByIdAndDelete(ticketId);
    
        res.json({ success: true, message: 'Ticket moved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error moving ticket' });
    }
    });

module.exports = ArchiveRoute;