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


const createAll = async(req, res)=>{
    const note =  req.body;
    try{
    const newNotes = await Note.insertMany(note);
    res.status(202).json({
        message : "multiple notes added successfully",
        data : newNotes
    })
    }
    catch(err){
res.status(500).send(err);
    }
}

const read = async(req, res)=>{
    try{
     const notes = await Note.find();
     if(!notes){
      return  res.status(404).send("notes not found");
     }
     res.status(202).json({
        note : notes
     })
    }
    catch(err){
  res.status(500).send(err);
    }
}
