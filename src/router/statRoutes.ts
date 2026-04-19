import { db } from '../config/firebase.ts';
import { collection, doc, setDoc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import type { FirestoreDataConverter } from 'firebase/firestore';


interface user {
    av: number;
    games: number;
    short: number;
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
        const shortest: number = Number(score) < userStats.short ? Number(score) : userStats.short;
        const statsRef = collection(db, "stats");
        await setDoc(doc(statsRef, username), {
          av: average,
          games: game,
          short: shortest
        });
    };
};