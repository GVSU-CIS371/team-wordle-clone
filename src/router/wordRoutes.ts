import { db } from '../config/firebase.ts'
import getWord from '../../word/words.ts'
import admin from 'firebase-admin';


interface words {
    date: string;
    word: string;
};

const wordConverter: admin.firestore.FirestoreDataConverter<words> = {
  toFirestore(user: words): admin.firestore.DocumentData {
    return user;
  },
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): words {
    return snapshot.data() as words;
  }
};

export async function get_word(date: string): Promise<string> {
    const ref = db.collection('stats').doc(date).withConverter(wordConverter);
        const docRef = await ref.get();
        const word = docRef.data();
        if (word) {
            return word.word;
        }
        else {
            return create_word(date);
        };
};

export async function create_word(date: string): Promise<string> {
    const word = getWord(date);
    const word_data: words = {date: date, word: word};
    const docRef = await db.collection("users").add(word_data);
    return word;
};

export async function guess_word(guess: string, word: string): Promise<object> {
    let info = {};
    for (let i = 0; i < 5; i++) {
        if (guess[i] === word[i]) {
            info = {...info, i: 'correct'};
            word = word.substring(0, i) + '0' + word.substring(i+1);
        } else if (word.includes(guess.charAt(i))) {
            info = {...info, i: 'in word'};
            word = word.substring(0, i) + '0' + word.substring(i+1);
        } else {
            info = {...info, i: 'not in word'};
        }
    };
    return info;
};