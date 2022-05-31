const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    const content = fs.readFileSync('./db/db.json', 'utf8');
    res.send(content);    
});

router.post('/', (req, res) => {
    const content = fs.readFileSync('./db/db.json', 'utf8');
    
    const db = JSON.parse(content);
    
    const { title, text } = req.body;
    const id = uuidv4();

    if (!title || !text) {
        res.send('Title and text cannot be blank!');
        return;
    };

    const newNote = {
        id,
        title,
        text
    };

    console.log(db);    

    db.push(newNote);
    console.log(db);
    
    const notes = JSON.stringify(db);
    fs.writeFile('db/db.json', notes, function (err,res){
        if (err) console.log('error', err);
    });
    
    res.json(newNote);
});

router.delete('/:id', (req, res) => {
    const content = fs.readFileSync('./db/db.json', 'utf8');
    const db = JSON.parse(content);

    res.json('ok');
    const updatedNotes = [];
    for (let i = 0; i < db.length; i++) {
        const note = db[i];
        if (note.id !== req.params.id){
            updatedNotes.push(note);
        };
    };
    const notes = JSON.stringify(updatedNotes);
    fs.writeFile('db/db.json', notes, function (err, res){
        if (err) console.log('error', err);
    });
});

module.exports = router;