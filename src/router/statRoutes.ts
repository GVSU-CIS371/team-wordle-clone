import { db } from '../config/firebase.ts';
import admin from 'firebase-admin';


interface user {
    av: number;
    games: number;
    short: number;
};

const userConverter: admin.firestore.FirestoreDataConverter<user> = {
  toFirestore(user: user): admin.firestore.DocumentData {
    return user;
  },
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): user {
    return snapshot.data() as user;
  }
};

export async function update_score(username: string, score: number): Promise<void> {
    const ref = db.collection('stats').doc(username).withConverter(userConverter);
    const docRef = await ref.get();
    const userStats = docRef.data();
    if (userStats) {
        const average: number = (userStats.av + Number(score))/(userStats.games+1);
        const shortest: number = Number(score) < userStats.short ? Number(score) : userStats.short;
        await ref.set({
            av: average, 
            games: userStats.games+1, 
            short: shortest
        });
    };
};