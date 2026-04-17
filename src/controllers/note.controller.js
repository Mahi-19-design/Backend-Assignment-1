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

const readOne = async(req, res)=>{
    try{
   const note = req.params.id ;
   const product = await Note.findById(note);
    res.status(200).json({
        note : product
    })
    }
    catch(err){
    res.status(500).send(err)
    }
}




const update = async(req, res)=>{
    try{
const update = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true , runValidators : true});


    if(!update){
      return  res.status(400).json({msg : "note not found "})
    }
 res.status(200).json({
    msg : "note updated successfully",
    note : update
 })
    }
    catch(err){
res.status(500).send(err);
    }
}

const deleteNote = async(req, res)=>{


    try{
  const deletenote = await Note.findByIdAndDelete(req.params.id);
  if(!deletenote){
    return res.status(400).json({msg : 'notes not found'})
  }
  res.status(200).json({msg: 'note deleted successfully'})
    }
    catch(err){
        res.status(500).send(err);
    }
}

const deleteMany = async(req, res)=>{
    try{
  const ids = req.body.ids;
  const deletedNotes = await Note.deleteMany({_id: {$in: ids}});
  if(deletedNotes.deletedCount === 0){
    return res.status(400).json({msg : 'no notes found to delete'})
  }
  res.status(200).json({msg: 'notes deleted successfully', deletedCount: deletedNotes.deletedCount})
    }
    catch(err){
        res.status(500).send(err);
    }
}


module.exports = {create , createAll , read , readOne , update , deleteNote , deleteMany}