import { db } from '../config/firebase.ts'
import getWord from '../../util/words.ts'
import { collection, doc, setDoc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import type { FirestoreDataConverter } from 'firebase/firestore';

interface words {
    date: string;
    word: string;
};

const wordConverter: FirestoreDataConverter<words> = {
  toFirestore(word: words): words {
    return word;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): words {
    return snapshot.data() as words;
  }
};

export async function get_word(date: string): Promise<string> {
    const ref = await getDoc(doc(db, 'stats', date).withConverter(wordConverter));
    const word = ref.data();
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
    const wordRef = collection(db, "wordlist");
        await setDoc(doc(wordRef, date), {
          date: date,
          word: word
        });
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