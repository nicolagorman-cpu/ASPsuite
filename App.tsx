import React, { useState, useEffect, useCallback } from 'react';
import { Tab, TABS } from './constants';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import PageContent from './components/layout/PageContent';
import ContactsPage from './components/pages/ContactsPage';
import ComingSoonPage from './components/pages/ComingSoonPage';
import LoginPage from './components/pages/LoginPage';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { Contact } from './types';
import { onAuthStateChangedWrapper, signOutUser, User } from './services/authService';
import { addContact, getContacts, updateContact as updateContactInDb, deleteContact as deleteContactFromDb } from './services/firestoreService';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.CONTACTS);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedWrapper((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchContacts = useCallback(async () => {
        if (user) {
            try {
                const querySnapshot = await getContacts(user.uid);
                const fetchedContacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Contact[];
                setContacts(fetchedContacts);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        } else {
            setContacts([]); // Clear contacts if user logs out
        }
    }, [user]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);


    const handleAddContact = async (contactData: Omit<Contact, 'id' | 'ownerUid'>) => {
        if (!user) return;
        try {
            const newContactWithOwner = { ...contactData, ownerUid: user.uid };
            await addContact(newContactWithOwner);
            fetchContacts(); // Refetch the list to include the new contact
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const handleUpdateContact = async (updatedContact: Contact) => {
        try {
            const { id, ownerUid, ...dataToUpdate } = updatedContact;
            await updateContactInDb(id, dataToUpdate);
            fetchContacts(); // Refetch for consistency
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleDeleteContact = async (contactId: string) => {
        try {
            await deleteContactFromDb(contactId);
            fetchContacts(); // Refetch to remove the deleted contact
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const renderPage = () => {
        const tabInfo = TABS.find(t => t.id === activeTab);
        if (!tabInfo) return null;

        if (activeTab === Tab.CONTACTS) {
            return (
                <ContactsPage
                    contacts={contacts}
                    onAddContact={handleAddContact}
                    onUpdateContact={handleUpdateContact}
                    onDeleteContact={handleDeleteContact}
                />
            );
        }
        return <ComingSoonPage title={tabInfo.label} icon={<tabInfo.icon />} />;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-brand-dark-200">
                <LoadingSpinner />
            </div>
        );
    }

    if (!user) {
        return <LoginPage />;
    }

    return (
        <div className="flex h-screen text-white bg-brand-dark-200">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    title={TABS.find(t => t.id === activeTab)?.label || 'Dashboard'} 
                    userEmail={user.email}
                    onSignOut={handleSignOut}
                />
                <PageContent>
                    {renderPage()}
                </PageContent>
            </div>
        </div>
    );
};

export default App;