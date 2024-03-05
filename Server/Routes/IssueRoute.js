const express = require('express');
const jwt = require("jsonwebtoken");
const IssueRoute = express.Router();
const Issue = require("../Models/Issues");
const Archive = require("../Models/ArchivedTickets");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser"); 

const myPassword = process.env.Password

IssueRoute.use(cookieParser())
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

IssueRoute.post("/AddIssue", verifyToken ,async (req, res) => {
    const Issues = new Issue(req.body)

    try {
        const SavedIssues = await Issues.save() 
        res.send(SavedIssues)
    } catch (error) {
        console.error(error)
    }
})

IssueRoute.get("/AllIssues", async (req, res) => { 
    try{
        const AllIssues = await Issue.find() 
        res.json(AllIssues)
    }
    catch(err) { 
        res.send(err)  
    }
})

IssueRoute.get("/AllIssuesLength", async (req, res) => { 
    try{
        const AllIssues = await Issue.find()  
        const ArrayLength = AllIssues.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

IssueRoute.get('/:userId/Issues', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Issues = await Issue.find({ userOwner: userId });
        res.json(Issues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Issues.' });
    }
}); 

// UPDATE

IssueRoute.put("/:id", async (req, res) => {
    try{
        const Issues= await Issue.findByIdAndUpdate(req.params.id, req.body)
        res.json(Issues)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETE

IssueRoute.delete("/:id", async (req, res) => {
    try{
        const Issues = await Issue.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

// ISSUE BY ID

IssueRoute.get('/:id', async (req, res) => {
    try {
    const Issues = await Issue.findById(req.params.id);
    if (!Issues) {
        return res.status(404).json({ message: 'Issues not found' });
    }
    res.json(Issues);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// PROJECT RELATED ISSUE

IssueRoute.get(`/Projects/:Projects`, async (req, res) => {
    const Projects = req.params.Projects

    try {
    const Tickets = await Issue.find({ Projects: Projects }) 

    if (!Tickets) {
        return res.status(404).json({ message: 'Tickets not found' }) 
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Why!!!' })
    }
});


// TICKET BY PRIORITY

IssueRoute.get('/Priority/:Priority', async (req, res) => {
    const Priority = req.params.Priority

    try {
    const Issues = await Issue.find({ Priority: Priority });
    if (!Issues) {
        return res.status(404).json({ message: 'Issues not found' });
    }
    res.json(Issues);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
}); 

IssueRoute.get('/PriorityLength/:Priority', async (req, res) => {
    const Priority = req.params.Priority

    try {
        const Issues = await Issue.find({ Priority: Priority })
        const ArrayLength = Issues.length;

        res.json({ ArrayLength });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// TICKET BY STATUS

IssueRoute.get('/Status/:Status', async (req, res) => {
    const Status = req.params.Status

    try {
    const Issues = await Issue.find({ Status: Status });
    if (!Issues) {
        return res.status(404).json({ message: 'Issues not found' });
    }
    res.json(Issues);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

IssueRoute.get('/StatusLength/:Status', async (req, res) => {
    const Status = req.params.Status

    try {
        const Issues = await Issue.find({ Status: Status })
        const ArrayLength = Issues.length;

        res.json({ ArrayLength });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// TICKET BY TYPE

IssueRoute.get('/Category/:Category', async (req, res) => {
    const Category = req.params.Category

    try {
    const Issues = await Issue.find({ Category: Category });
    if (!Issues) {
        return res.status(404).json({ message: 'Issues not found' });
    }
    res.json(Issues);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

IssueRoute.get('/CategoryLength/:Category', async (req, res) => {
    const Category = req.params.Category

    try {
    const Issues = await Issue.find({ Category: Category }) 
    const ArrayLength = Issues.length;

    res.json({ ArrayLength });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

IssueRoute.post('/moveTicket/:ticketId', async (req, res) => {
const { ticketId } = req.params;

try {
    // Find the ticket in the source model
    const Issues = await Issue.findById(ticketId); 

    // Create a new ticket in the destination model
    const Archives = new Archive({
        Title: Issues.Title,
        Projects: Issues.Projects,
        Description: Issues.Description, 
        Category: Issues.Category,
        Priority: Issues.Priority,
        Status: Issues.Status,
        Submitted: Issues.Submitted,
        Date: Issues.Date,
        ID: Issues._id,
        userOwner: Issues.userOwner 
    });

    // Save the new ticket in the destination model
    await Archives.save();

    // Remove the ticket from the source model
    await Issue.findByIdAndDelete(ticketId);

    res.json({ success: true, message: 'Ticket moved successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error moving ticket' });
}
});

module.exports = IssueRoute