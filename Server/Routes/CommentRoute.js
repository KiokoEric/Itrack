const express = require('express');
const jwt = require("jsonwebtoken");
const CommentRoute = express.Router();
const Comment = require("../Models/Comment");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser"); 

const myPassword = process.env.Password

CommentRoute.use(cookieParser())
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

CommentRoute.post("/AddComment", verifyToken ,async (req, res) => {
    const Comments = new Comment(req.body)

    try {
        const SavedComments = await Comments.save() 
        res.send(SavedComments)
    } catch (error) {
        console.error(error)
    }
})

CommentRoute.get("/AllComments", async (req, res) => { 
    try{
        const AllComments = await Comment.find() 
        res.json(AllComments)
    }
    catch(err) { 
        res.send(err)  
    }
})

CommentRoute.get('/:userId/Comments', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Comments = await Comment.find({ userOwner: userId });
        res.json(Comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Issues.' });
    }
}); 

// UPDATE

CommentRoute.put("/:id", async (req, res) => {
    try{
        const Comments = await Comment.findByIdAndUpdate(req.params.id, req.body)
        res.json(Comments)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETE

CommentRoute.delete("/:id", async (req, res) => {
    try{
        const Comments = await Comment.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

CommentRoute.get(`/Comment/:TicketID`, async (req, res) => {
    const TicketID = req.params.TicketID

    try { 
    const Comments = await Comment.find({ TicketID: TicketID }) 

    if (!Comments) {
        return res.status(404).json({ message: 'No comment not found' })
    } 
    res.json(Comments);
    } catch (error) { 
    res.status(500).json({ message: 'Server Error' }) 
    }
});

CommentRoute.get('/:TicketID/Name', async (req, res) => { 

    const userId = req.params.userId;

    try {
    const UserID= await Comment.findById({ userOwner: userId });
    if (!UserID) {
        return res.status(404).json({ message: 'User was not found' });
    }
    res.json({ Name: UserID.Name });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});


CommentRoute.get('/Commentators/:commentatorId', (req, res) => {
    const commentatorId = req.params.commentatorId;

    Comment.findById(commentatorId, (err, commentator) => {
        if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!commentator) {
        return res.status(404).json({ error: 'Commentator not found' });
        }
        return res.json(commentator);
    });
});

module.exports = CommentRoute