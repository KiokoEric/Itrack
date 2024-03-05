const express = require('express');
const jwt = require("jsonwebtoken");
const Project = require("../Models/Projects");
const ArchivedProjectRoute = express.Router();
const Archive = require("../Models/ArchivedProjects");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser"); 

const myPassword = process.env.Password

ArchivedProjectRoute.use(cookieParser())
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

ArchivedProjectRoute.post("/AddArchive", verifyToken ,async (req, res) => { 
    const Archives = new Archive(req.body)

    try {
        const SavedArchives = await Archives.save() 
        res.send(SavedArchives)
    } catch (error) {
        console.error(error)
    }
})

ArchivedProjectRoute.get("/Archives", async (req, res) => { 
    try{
        const AllArchives = await Archive.find() 
        res.json(AllArchives)
    }
    catch(err) { 
        res.send(err)  
    }
})

ArchivedProjectRoute.get("/ArchivesLength", async (req, res) => { 
    try{
        const AllArchives = await Archive.find()  
        const ArrayLength = AllArchives.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

ArchivedProjectRoute.get('/:id', async (req, res) => {
    try {
    const Projects = await Archive.findById(req.params.id);
    if (!Projects) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.json(Projects);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

ArchivedProjectRoute.delete("/:id", async (req, res) => {
    try{
        const Issues = await Archive.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

ArchivedProjectRoute.post('/moveProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    
    try {
        // Find the project in the source model
        const Archives = await Archive.findById(projectId);
    
        // Create a new project in the destination model
        const Projects = new Project({
            Title: Archives.Title,
            Description: Archives.Description,
            StartDate: Archives.StartDate,
            EndDate: Archives.EndDate,
            Priority: Archives.Priority,
            Manager: Archives.Manager,
            Assigned: Archives.Assigned,
            Image: Archives.Image,
            Date: Archives.Date,
            userOwner: Archives.userOwner
        });
    
        // Save the new project in the destination model
        await Projects.save();
    
        // Remove the project from the source model
        await Archive.findByIdAndDelete(projectId);
    
        res.json({ success: true, message: 'Project moved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error moving project.' });
    }
    });

module.exports = ArchivedProjectRoute;