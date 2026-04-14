import express from 'express'
import { db } from '../config/firebase.ts'
import getWord from '../word/words.ts'

const wordRouter = express.Router();

type words = {
    date: string,
    word: string
};

wordRouter.get('/wordlist/:date', async (req, res)=>{
    const { date } = req.params;
    const ref = await db.collection("wordlist").where('date', '==', date).get();
    if (!ref.empty) {
        const docSnap = ref.docs[0];
        console.log("Document data:", docSnap.data());
        res.status(200).send(docSnap.data().word);
    } else {
        console.log("New word");
        res.status(401);
  }
});

wordRouter.post('/wordlist/:date', async(req, res)=> {
    const { date } = req.params;
    const word = getWord(date);
    const word_data: words = {date: date, word: word};
    const docRef = await db.collection("users").add(word_data);
    res.status(201);
});

export default wordRouter;