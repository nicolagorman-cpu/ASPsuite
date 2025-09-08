
import React from 'react';
import { Contact } from '../../types';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

interface ContactsTableProps {
    contacts: Contact[];
    onEdit: (contact: Contact) => void;
    onDelete: (contactId: string) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts, onEdit, onDelete }) => {
    const getCategoryClass = (category: string) => {
        switch (category) {
            case 'Client': return 'bg-blue-500 text-blue-100';
            case 'Contractor': return 'bg-green-500 text-green-100';
            case 'Partner': return 'bg-yellow-500 text-yellow-100';
            default: return 'bg-gray-500 text-gray-100';
        }
    };
    
    return (
        <div className="bg-brand-dark rounded-lg shadow-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-brand-dark-300 text-gray-300 uppercase text-sm tracking-wider">
                    <tr>
                        <th className="p-4">Company Name</th>
                        <th className="p-4">Contact Person</th>
                        <th className="p-4">Email & Phone</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-brand-dark-300">
                    {contacts.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center p-8 text-gray-400">
                                No contacts found. Add one to get started.
                            </td>
                        </tr>
                    ) : (
                        contacts.map(contact => (
                            <tr key={contact.id} className="hover:bg-brand-dark-200 transition-colors">
                                <td className="p-4 font-medium">{contact.companyName}</td>
                                <td className="p-4 text-gray-300">{contact.contactPerson}</td>
                                <td className="p-4 text-gray-300">
                                    <div>{contact.email}</div>
                                    <div className="text-sm text-gray-400">{contact.phone}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryClass(contact.category)}`}>
                                        {contact.category}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-end space-x-3">
                                        <button onClick={() => onEdit(contact)} className="text-gray-400 hover:text-brand-primary transition-colors">
                                            <EditIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => onDelete(contact.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <DeleteIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsTable;
