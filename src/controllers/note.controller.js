const Note = require('../models/note.models')

const create = async(req, res)=>{
    try{
        const {title , content , category , isPinned} = req.body;
        const newNote = new Note({title , category , content , isPinned }) 
        await newNote.save();
        res.status(202).json({
            note : newNote
        });
    }
    catch(error){
        res.status(500).json({
            msg : "server error"
        })
    }
}
