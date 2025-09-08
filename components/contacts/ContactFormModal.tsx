

import React, { useState, useEffect } from 'react';
import { Contact, ContactCategory } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface ContactFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    // FIX: Updated the onAddContact prop type to Omit<Contact, 'id' | 'ownerUid'>.
    // This fixes the TypeScript error on line 56, as the form state does not
    // and should not contain the ownerUid.
    onAddContact: (contact: Omit<Contact, 'id' | 'ownerUid'>) => void;
    onUpdateContact: (contact: Contact) => void;
    existingContact: Contact | null;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose, onAddContact, onUpdateContact, existingContact }) => {
    const initialState = {
        companyName: '',
        contactPerson: '',
        phone: '',
        email: '',
        physicalAddress: '',
        category: ContactCategory.CLIENT,
        abn: ''
    };
    
    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if (existingContact) {
            setFormState({
                companyName: existingContact.companyName,
                contactPerson: existingContact.contactPerson,
                phone: existingContact.phone,
                email: existingContact.email,
                physicalAddress: existingContact.physicalAddress,
                category: existingContact.category,
                abn: existingContact.abn || ''
            });
        } else {
            setFormState(initialState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existingContact, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (existingContact) {
            onUpdateContact({ ...existingContact, ...formState });
        } else {
            onAddContact(formState);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={existingContact ? 'Edit Contact' : 'Add New Contact'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Company Name" name="companyName" value={formState.companyName} onChange={handleChange} required />
                <Input label="Contact Person" name="contactPerson" value={formState.contactPerson} onChange={handleChange} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Email Address" name="email" type="email" value={formState.email} onChange={handleChange} required />
                    <Input label="Phone Number" name="phone" type="tel" value={formState.phone} onChange={handleChange} required />
                </div>
                <Input label="Physical Address" name="physicalAddress" value={formState.physicalAddress} onChange={handleChange} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <select
                            name="category"
                            value={formState.category}
                            onChange={handleChange}
                            className="w-full bg-brand-dark-300 border border-brand-dark-300 text-white rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
                        >
                            {Object.values(ContactCategory).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="ABN / Tax ID (Optional)" name="abn" value={formState.abn} onChange={handleChange} />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                    <Button type="submit">{existingContact ? 'Save Changes' : 'Create Contact'}</Button>
                </div>
            </form>
        </Modal>
    );
};

export default ContactFormModal;