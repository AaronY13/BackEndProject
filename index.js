//Aaron Yeung
//1) This program allows users to communicate with a server, getting information, editing information
//2) This project taught me how the front communicates with the back end and use "Get", "Post", "Put", "Delete"
//3) This project can be extended by using a bigger database with more users who might edit at the same time.

/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
const express = require('express');
const app = express();
app.use(express.json());



const musicList = [
    {id: 1, name: 'Old Town Road', genre: 'pop', month: 'December', year: '2019'},
    {id: 2, name: 'Just Wanna Rock', genre: 'hip hop', month: 'October', year: '2022'},
    {id: 3, name: 'Lose Yourself', genre: 'rap', month: 'October', year: '2002'},
    {id: 4, name: 'Fur Elise', genre: 'classical', month: 'April', year: '1810'},
    {id: 5, name: 'Bohemian Rhapsody', genre: 'rock', month: 'October', year: '1975'},
    {id: 6, name: 'What a Wonderful World', genre: 'jazz', month: 'September', year: '1967'},
    {id: 7, name: 'Hoochie Coochie Man', genre: 'blues', month: 'January', year: '1954'},
    {id: 8, name: 'Old Town Road', genre: 'electronic', month: 'November', year: '2012'},
]
//=========== ROUTES FOR HTTP GET REQUESTS ==========

app.get('/api/musicList', (req, res)=>{
    res.send(musicList);
})

app.get('/api/musicList/', (req,res)=>{
    res.send("Welcome to the Music App! Aaron Yeung Even Pd 7-8");
  })
  
  app.get('/api/courses/:id', (req,res)=>{
      const music = musicList.find(c=> c.id === parseInt(req.params.id));
      if(!music){
          res.status(404).send("The course with the given ID was not found");
          return
      }
      res.send(music);
  })

//=========== ROUTES FOR HTTP POST REQUESTS ==========

app.post('/api/musicList/', (req, res) => {
    if (!req.body.name) {
        res.status(400).send("Missing name");
        return;
    }
    if (req.body.name.length < 1 || req.body.name.length >= 30) {
        res.status(400).send("The song name length must be between 1 to 30 characters"); 
        return;
    }
    if (!req.body.genre) {
        res.status(400).send("Missing genre");
        return;
    }
    if (req.body.genre.length < 3 || req.body.genre.length >= 30) {
        res.status(400).send("The song name length must be between 3 to 20 characters"); //condition
    }

    let music = {
        id: musicList.length + 1,
        name: req.body.name,
        genre: req.body.genre,
        month: req.body.month,
        year: req.body.year
    };
    musicList.push(music);
    res.status(200).send(music);
});


//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/musicList/:id', (req, res) => {
    if (!req.body.name) {
        res.status(400).send("Missing name");
        return;
    }
    if (req.body.name.length < 1 || req.body.name.length >= 30) {
        res.status(400).send("The song name length must be between 1 to 30 characters"); 
        return;
    }
    if (!req.body.genre) {
        res.status(400).send("Missing genre");
        return;
    }
    if (req.body.genre.length < 3 || req.body.genre.length >= 30) {
        res.status(400).send("The song name length must be between 3 to 20 characters"); //condition
    }
    musicList[req.params.id - 1] = {
        id: parseInt(req.params.id),
        name: req.body.name,
        genre: req.body.genre,
        month: req.body.month,
        year: req.body.year
    }
    res.status(200).send(musicList[req.params.id - 1]);
});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========

app.delete('/api/musicList/:id', (req, res) => {
    const music = musicList.find(m => m.id === parseInt(req.params.id));
    if (!music) {
        res.status(400).send("Song not found");
        return;
    }
    let objIndex = musicList.indexOf(music);
    musicList.splice(objIndex, 1);

    musicList.forEach((obj, index) => {
        obj.id = index + 1;
    })
    
    res.status(200).send("Song deleted successfully");
});

app.listen(3000, () => { 
    console.log('Listening on Port 3000... Aaron Yeung'); 
});