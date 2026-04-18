import { getSongs, getMusicBoxes, getFilteredSongs } from './firebase.js'
import './transactions.js';
import express from 'express';
import cors from 'cors';


const port = process.env.FIRESTORE_API_PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json()); 


app.get('/db/get/boxes', async (req, res) => {
    try {
        const musicBoxesSnapshot = await getMusicBoxes(); 
        const musicBoxes = musicBoxesSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data() 
            };
        });
        console.log('Sending Music Boxes: ', musicBoxes);
        res.status(200).json(musicBoxes);
        
    } catch (error) {
        console.log('Error while getting music boxes: ', error);
        res.status(500).json({message: 'Internal server error'});
    }

})


app.get('/db/get/songs', async (req, res) => {
    try {
        const { text } = req.query;
        let songsSnapShot;

        if(!text) {
            songsSnapShot = await getSongs();
        } 

        else {
            songsSnapShot = await getFilteredSongs(text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        }

        const songs = songsSnapShot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        console.log('Sending songs: ', songs);
        res.status(200).json(songs);

    } catch (error) {
       console.log('Error while getting and filtering songs: ', error);
       res.status(500).json({message: 'Internal server error'});
    }
})


app.listen(port, () => {
    console.log(`Database server running on port: ${port}.`)
})

// El programa se ejecuta con: node index.js
