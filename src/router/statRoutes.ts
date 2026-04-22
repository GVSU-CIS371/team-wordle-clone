import { db } from '../config/firebase.ts';
import { collection, doc, setDoc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import type { FirestoreDataConverter } from 'firebase/firestore';


export interface user {
    av: number;
    games: number;
    short: number;
    wins: number;
};

const userConverter: FirestoreDataConverter<user> = {
  toFirestore(user: user): user {
    return user;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): user {
    return snapshot.data() as user;
  }
};

export async function update_score(username: string, score: number): Promise<void> {
    const ref = await getDoc(doc(db, 'stats', username).withConverter(userConverter));
    const userStats = ref.data();
    if (userStats) {
        const average: number = (userStats.av + Number(score))/(userStats.games+1);
        const game: number = userStats.games;
        let win: number = userStats.wins;
        if (score < 7) {
          win += 1;
        }
        const shortest: number = Number(score) < userStats.short ? Number(score) : userStats.short;
        const statsRef = collection(db, "stats");
        await setDoc(doc(statsRef, username), {
          av: average,
          games: game,
          short: shortest,
          wins: win
        });
    };
};

export async function get_score(username: string): Promise<user> {
  const ref = await getDoc(doc(db, 'stats', username).withConverter(userConverter));
  return ref.data()!;
};

export async function create_user(email: string): Promise<void> {
  const users = collection(db, "wordlist");
  await setDoc(doc(users, email), {
    av: 0,
    games: 0,
    short: 7,
    wins: 0
  });
};