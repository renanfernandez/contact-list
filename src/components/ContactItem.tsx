import { useState } from 'react';
import { IContact } from '../utils/interfaces';
import { useContactContext } from '../context/useContextHook';

interface ContactItemProps {
  info: IContact;
}

const ContactItem: React.FC<ContactItemProps> = ({ info }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContact, setEditedContact] = useState<IContact>({ ...info }); 
  const { deleteContact, updateContact } = useContactContext();

  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  const toggleEditing = () => {
    setIsEditing(prevState => !prevState);
  };

  const handleUpdate = () => {
    updateContact(editedContact.id, editedContact); 
    setIsEditing(false); 
  };

  const handleDelete = (id: number) => {
    deleteContact(id);
  };

  return (
    <div className='contact-item'>
      <div className="contact-header">
        <div className="contact-header--title">
          <b>{info.name}</b>
        </div>
        <div className="contact-header--toggle">
          <button className={isOpen ? 'btn-toggle open' : 'btn-toggle'} onClick={handleToggle}> &#x3E; </button>
        </div>
      </div>
      {isOpen &&
        (
          <div className="contact-content">
            {isEditing
              ? (
                <form className='contact-form'>
                  <div className="contact-form--input">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name='name' value={editedContact.name} onChange={e => setEditedContact({ ...editedContact, name: e.target.value })} />
                  </div>
                  <div className="contact-form--input">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" name='email' value={editedContact.email} onChange={e => setEditedContact({ ...editedContact, email: e.target.value })} />
                  </div>
                  <div className="contact-form--input">
                    <label htmlFor="phone">Telefone</label>
                    <input type="text" name="phone" value={editedContact.phone} onChange={e => setEditedContact({ ...editedContact, phone: e.target.value })} />
                  </div>                  
                  <div className="contact-form--input">
                    <label htmlFor="businessPhone">Telefone Comercial</label>
                    <input type="text" name="businessPhone" value={editedContact.businessPhone} onChange={e => setEditedContact({ ...editedContact, businessPhone: e.target.value })} />
                  </div>                                    
                  <div className="contact-form--textarea">
                    <label htmlFor="additionalInfo">Informação Adicional</label>
                    <textarea name="additionalInfo" value={editedContact.additionalInfo} onChange={e => setEditedContact({ ...editedContact, additionalInfo: e.target.value })} />
                  </div>                 
                  <div className="contact-form--action">
                    <button className='btn primary-btn' onClick={handleUpdate}>Atualizar</button>
                    <button className='btn cancel-btn' onClick={toggleEditing}>Cancelar</button>
                  </div>
                </form>
              ) : (
                <div className="contact-content--info">
                  <div className="contact-item--phone">
                    <b>Telefone:</b> {info.phone}
                  </div>
                  {info.businessPhone && (
                    <div className="contact-item--businessPhone">
                      <b>Telefone Comercial:</b> {info.businessPhone}
                    </div>
                  )}
                  <div className="contact-item--email">
                    <b>E-mail:</b> {info.email}
                  </div>                  
                  {info.additionalInfo && (
                    <div className="contact-item--additionalInfo">
                      <b>Informação Adicional:</b> {info.additionalInfo}
                    </div>
                  )}
                </div>
              )}
            <div className="contact-actions">
              {!isEditing && (
                <>
                  <button className='btn primary-btn' onClick={toggleEditing}>Editar</button>
                  <button className='btn cancel-btn' onClick={() => handleDelete(info.id)}>Apagar</button>
                </>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default ContactItem;
