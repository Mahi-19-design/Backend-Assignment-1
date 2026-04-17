

 const express = require('express')
const router = express.Router();


const {create , createAll , read , readOne , update , deleteNote , deleteMany} = require('../controllers/note.controller')


router.post('/notes' , create);
router.post('/notes/bulk' , createAll);
router.get('/notes',read);
router.get('/notes/:id' , readOne);
router.put('/notes/:id' , update);
router.delete('/notes/:id' , deleteNote);
router.delete('/notes/bulk' , deleteMany);


module.exports = router;


