import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { IContact, IContactContext } from "../utils/interfaces";

export const ContactContext = createContext<IContactContext | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [suggestions, setSuggestions] = useState<IContact[]>([]);
  const [search, setSearch] = useState<string>('');
  const apiUrl = 'http://localhost:3000/contacts';

  const getContacts = async (search: string): Promise<void> => {
    try {
      const response = await axios.get<IContact[]>(`${apiUrl}?name_like=${search}`);
      const sortedContacts = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(sortedContacts);
    } catch (error) {
      console.error('Erro ao carregar os contatos: ', error);
    }
  };

  const getSuggestions  = async (value:string): Promise<void> => {
    try {
      const response = await axios.get<IContact[]>(`${apiUrl}`);
      const filteredSuggestions = response.data.filter((contact: IContact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()) ||
        contact.phone.includes(value)
      );
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error('Erro ao carregar os contatos: ', error);
    }
  };

  const resetSuggestions = () => {
    setSuggestions([])
  }

  const addContact = async (contact: IContact): Promise<void> => {
    try {
      const response = await axios.post<IContact>(apiUrl, contact);
      const addContact = [...contacts, response.data];      
      const sortedContacts = addContact.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(sortedContacts);
    } catch (error) {
      console.error('Erro ao adicionar contato', error);
    }
  };

  const updateContact = async (id: number, contact: IContact): Promise<void> => {
    try {
      const response = await axios.put<IContact>(`${apiUrl}/${id}`, contact);
      setContacts(prevContacts => prevContacts.map(c => c.id === id ? response.data : c));
    } catch (error) {
      console.error('Erro ao atualizar contato', error);
    }
  };

  const deleteContact = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Erro ao deletar contato', error);
    }
  };

  useEffect(() => {
    getContacts(search);
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, getContacts, deleteContact, updateContact, addContact, search, setSearch, suggestions, getSuggestions, resetSuggestions }}>
      {children}
    </ContactContext.Provider>
  );
};
