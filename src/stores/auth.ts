import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, type User } from 'firebase/auth';
import { create_user } from "@/router/statRoutes";

const auth = getAuth();

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        accessToken: null,
        loading: false,
    }),
    getters: {
        getEmail(): string {return this.user ? this.user.email! : ''}
    },
    actions: {
        async registerUser(email: string, password: string) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                await create_user(email);
            } catch (error) {
                console.error("Error creating user document:", error);
            }
        },
        async login(email: string, password: string) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
            } catch (error) {
                console.error("Error creating user document:", error);
            }
        }
    }
});