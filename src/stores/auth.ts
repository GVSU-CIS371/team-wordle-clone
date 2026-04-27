import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { create_user } from "../router/statRoutes.ts";

const auth = getAuth();

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: Error | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        accessToken: null,
        loading: false,
        error: null
    }),
    persist: true,
    getters: {
        getEmail(): string {return this.user ? this.user.email! : ''}
    },
    actions: {
        async registerUser(email: string, password: string) {
            this.error = null;
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                await create_user(email);
            } catch (error: unknown) {
                if (error instanceof Error) {this.error = error;}
            }
        },
        async login(email: string, password: string) {
            this.error = null;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
            } catch (error: unknown) {
                if (error instanceof Error) {this.error = error;}
            }
        },
        setUser(user: User | null) {
            this.user = user;
        },
        async signout() {
            try {
                await signOut(auth);
                this.user = null;
                console.log("User signed out")
            } catch (error) {
                console.error("Error signing out user:", error);
            }
        }
    }
});
