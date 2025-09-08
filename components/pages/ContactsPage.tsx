

import React, { useState } from 'react';
import { Contact } from '../../types';
import ContactsTable from '../contacts/ContactsTable';
import ContactFormModal from '../contacts/ContactFormModal';
import Button from '../shared/Button';
import PlusIcon from '../icons/PlusIcon';

interface ContactsPageProps {
    contacts: Contact[];
    // FIX: Updated the onAddContact prop type to Omit<Contact, 'id' | 'ownerUid'>.
    // The ownerUid is added at a higher level (App.tsx) from the authenticated user,
    // so the contact form does not need to provide it.
    onAddContact: (contact: Omit<Contact, 'id' | 'ownerUid'>) => void;
    onUpdateContact: (contact: Contact) => void;
    onDeleteContact: (contactId: string) => void;
}

const ContactsPage: React.FC<ContactsPageProps> = ({ contacts, onAddContact, onUpdateContact, onDeleteContact }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const handleOpenAddModal = () => {
        setEditingContact(null);
        setIsModalOpen(true);
    };
    
    const handleOpenEditModal = (contact: Contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-300">Manage all client, contractor, and partner information in one centralized address book.</p>
                <Button onClick={handleOpenAddModal} className="flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Contact
                </Button>
            </div>

            <ContactsTable
                contacts={contacts}
                onEdit={handleOpenEditModal}
                onDelete={onDeleteContact}
            />

            <ContactFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddContact={onAddContact}
                onUpdateContact={onUpdateContact}
                existingContact={editingContact}
            />
        </div>
    );
};

export default ContactsPage;