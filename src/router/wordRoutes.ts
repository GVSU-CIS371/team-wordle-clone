import { db } from '../config/firebase.ts'
import getWord from '../../util/words.ts'
import { collection, doc, setDoc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import type { FirestoreDataConverter } from 'firebase/firestore';

interface words {
    date: string;
    word: string;
};

type info = {
  [key: number]: string | number;
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
    const wordRef = collection(db, "wordlist");
    if (word != 'Fail') {
        await setDoc(doc(wordRef, date), {
          date: date,
          word: word
        });
    } else {
        return 'Failed creating word';
    };
    return word;
};

export function guess_word(guess: string, word: string): { [key: number]: string; } {
    const info: { [key: number]: string; } = {};
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) {
            info[i] = 'correct';
            word = word.substring(0, i) + '0' + word.substring(i+1, word.length);
        } else if (word.includes(guess.charAt(i))) {
            info[i] = 'present';
            word = word.substring(0, word.indexOf(guess.charAt(i))) + '0' + word.substring(word.indexOf(guess.charAt(i))+1, word.length);
        } else {
            info[i] = 'absent';
        }
    };
    return info;
};