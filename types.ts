export enum ContactCategory {
    CLIENT = 'Client',
    CONTRACTOR = 'Contractor',
    PARTNER = 'Partner',
}

export interface Contact {
    id: string;
    companyName: string;
    contactPerson: string;
    phone: string;
    email: string;
    physicalAddress: string;
    category: ContactCategory;
    abn?: string;
    ownerUid: string; // Added to associate contact with a user
}
