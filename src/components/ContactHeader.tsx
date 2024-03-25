import React, { useState } from 'react'
import { useContactContext } from '../context/useContextHook';
import { IContact } from '../utils/interfaces';


const ContactHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { addContact } = useContactContext()

  const [formData, setFormData] = useState<IContact>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    businessPhone: '',
    additionalInfo: ''
  });

  const generateId = (): number => {
    const timestamp = Date.now().toString();
    const truncatedTimestamp = timestamp.slice(0, 6); 
    return parseInt(truncatedTimestamp);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactWithId: IContact = { ...formData, id: generateId() };
    addContact(contactWithId);
    setIsOpen(false);
    setFormData({
      id: 0,
      name: '',
      email: '',
      phone: '',
      businessPhone: '',
      additionalInfo: ''
    });
  };

  

  return (
    <header className="header">
      <div className="container">
        <div>
          <h1>Lista de Contatos </h1>
        </div>
        <div className="add-form-wrapper">
          <button className="add-contact-btn" onClick={toggleForm}>
            + Adicionar Contato
          </button>
          {isOpen && (
            <form className="add-form" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="add-form--input" placeholder="Name:" />
              <input type="text" name="email" value={formData.email} onChange={handleChange} className="add-form--input" placeholder="E-mail:" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="add-form--input" placeholder="Telefone:" />
              <input type="text" name="businessPhone" value={formData.businessPhone} onChange={handleChange} className="add-form--input" placeholder="Telefone Comercial:" />
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="add-form--textarea" placeholder="Informação adicional" />
              <button type="submit" className="btn primary-btn">Adicionar</button>
            </form>
          )}
        </div>
      </div>
    </header>  
  )
}

export default ContactHeader