import { db } from '../config/firebase.ts';
import { collection, doc, setDoc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import type { FirestoreDataConverter } from 'firebase/firestore';


export interface user {
    av: number;
    games: number;
    short: number | string;
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

export async function play_game(username:string): Promise<void> {
  const ref = await getDoc(doc(db, 'stats', username).withConverter(userConverter));
    const userStats = ref.data();
    if (userStats) {
      const average: number = userStats.av;
      const shortest: number | string = userStats.short;
      const win: number = userStats.wins;
      const games: number = userStats.games + 1;
      const statsRef = collection(db, "stats");
      await setDoc(doc(statsRef, username), {
          av: average,
          games: games,
          short: shortest,
          wins: win,
        });
    }
}

export async function update_score(username: string, score: number): Promise<void> {
    const ref = await getDoc(doc(db, 'stats', username).withConverter(userConverter));
    const userStats = ref.data();
    if (userStats) {
        const win: number = userStats.wins+1;
        let average: number;
        if (userStats.wins > 0) {
          average = (userStats.av*win + score)/(win);
        } else {average = score;};
        const game: number = userStats.games+1;
        let shortest: number | string;
        if (typeof userStats.short !== 'string'){
          shortest = score < userStats.short ? score : userStats.short;
        } else {shortest = score};
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
  const users = collection(db, "stats");
  await setDoc(doc(users, email), {
    av: 0,
    games: 0,
    short: 'N/A',
    wins: 0,
    windates: [] as Array<string>
  });
};
