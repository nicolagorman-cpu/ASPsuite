import { 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    type QuerySnapshot
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Contact } from "../types";

const contactsCollectionRef = collection(db, "contacts");

// Create
export const addContact = (contactData: Omit<Contact, 'id'>) => {
    return addDoc(contactsCollectionRef, contactData);
};

// Read
export const getContacts = (userId: string): Promise<QuerySnapshot> => {
    const q = query(contactsCollectionRef, where("ownerUid", "==", userId));
    return getDocs(q);
};

// Update
export const updateContact = (contactId: string, updatedData: Partial<Omit<Contact, 'id' | 'ownerUid'>>) => {
    const contactDoc = doc(db, "contacts", contactId);
    return updateDoc(contactDoc, updatedData);
};

// Delete
export const deleteContact = (contactId: string) => {
    const contactDoc = doc(db, "contacts", contactId);
    return deleteDoc(contactDoc);
};