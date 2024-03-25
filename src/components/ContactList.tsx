import React from 'react';
import ContactItem from './ContactItem';
import { useContactContext } from '../context/useContextHook';

const ContactList: React.FC = () => {  
  const { contacts } = useContactContext();

  return (
    <div>
  {contacts.map((contact, index) => {
    const initial = contact.name.charAt(0).toUpperCase();
    const isFirstContact = index === 0 || contacts[index - 1].name.charAt(0).toUpperCase() !== initial;
    return (
      <React.Fragment key={contact.id}>
        {isFirstContact && <div className='contact-list-header'>{initial}</div>}
        <ContactItem info={contact} />
      </React.Fragment>
    );
  })}
</div>
  );
};

export default ContactList;
