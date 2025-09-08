
import React from 'react';
import QuotesIcon from './components/icons/QuotesIcon';
import ProjectsIcon from './components/icons/ProjectsIcon';
import InvoicesIcon from './components/icons/InvoicesIcon';
import ContactsIcon from './components/icons/ContactsIcon';
import ReportsIcon from './components/icons/ReportsIcon';

export enum Tab {
    QUOTES = 'quotes',
    PROJECTS = 'projects',
    INVOICES = 'invoices',
    CONTACTS = 'contacts',
    REPORTS = 'reports',
}

interface TabInfo {
    id: Tab;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const TABS: TabInfo[] = [
    { id: Tab.QUOTES, label: 'Quoting', icon: QuotesIcon },
    { id: Tab.PROJECTS, label: 'Projects', icon: ProjectsIcon },
    { id: Tab.INVOICES, label: 'Invoices', icon: InvoicesIcon },
    { id: Tab.CONTACTS, label: 'Contacts', icon: ContactsIcon },
    { id: Tab.REPORTS, label: 'Reports', icon: ReportsIcon },
];
