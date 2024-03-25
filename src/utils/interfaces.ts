import { Dispatch, SetStateAction } from 'react';

export interface IContact {
  id: number;
  name: string;
  phone: string;
  businessPhone?: string;
  email: string;
  additionalInfo?: string;
}

export interface IContactContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  contacts: IContact[];
  getContacts: (search: string) => Promise<void>;
  addContact: (contact: IContact) => Promise<void>;
  updateContact: (id: number, contact: IContact) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  suggestions: IContact[];
  getSuggestions: (search: string) => Promise<void>;
  resetSuggestions: () => void;
}