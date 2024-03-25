import { useContext } from 'react';
import { ContactContext } from './contacts';
import { IContactContext } from '../utils/interfaces';

export const useContactContext = (): IContactContext => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider')
  }
  return context;
}