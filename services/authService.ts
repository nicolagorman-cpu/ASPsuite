import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    type User
} from "firebase/auth";
import { auth } from "../firebaseConfig";

// Re-export the User type for convenience in other components
export type { User };

export const onAuthStateChangedWrapper = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
    return signOut(auth);
};