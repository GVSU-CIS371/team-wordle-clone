import express from 'express'
import { db } from '../config/firebase.ts'
import { collection, doc, query, where, getDocs, addDoc, setDoc } from "firebase/firestore";

const statRouter = express.Router();

type user = {
    av: number,
    games: number,
    short: number
};

statRouter.post('/addStats/:username/:score', async (req, res) => {
    const { username, score } = req.params;
    const ref = await db.collection("wordlist").where('username', '==', username).get();
    const user: user = ref.docs[0].data() as user;
    const average: number = (user.av + Number(score))/(user.games+1);
    const shortest: number = Number(score) < user.short ? Number(score) : user.short;
    const docRef = db.collection('word_list').doc(username);
    await docRef.set({
        av: average, 
        games: user.games+1, 
        short: shortest
    });
    res.status(201).send();
});

export default statRouter;