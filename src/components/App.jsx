import {useState, useEffect} from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import {  MainContainer } from "./App.styled";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
    {id: nanoid(5), name: 'Лунная Роза', number: '071-0-232' },
    {id: nanoid(5), name: 'Hermione Kline', number: '645-17-19'},
    {id: nanoid(5), name: 'Eden Clements', number: '443-89-12'},
    {id: nanoid(5), name: 'Annie Copeland', number: '459-12-56' },
  ]
  );
  const [filter, setFilter] = useState('');

 useEffect(()=> {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

  const onSubmitHandler = ({name, number}) => {
    
    const newContact = {
      id: nanoid(5),
      name: name,
      number: number
    }
   
    const sameName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
   
    if (sameName) {
      return toast.error(`${name} is already in contacts`);
    } 
    setContacts(prevState => [...prevState, newContact]);

  
  };


  const changeFilter = (e) => {
    setFilter(e.currentTarget.value)
  }


  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };


  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };


    return (
    <div>
        <MainContainer>
          <h1>Phonebook</h1>
          <ContactForm onFormSubmit={onSubmitHandler  } />
          
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} /> 
          {contacts.length === 0
            ? <p>empty</p>
            : <ContactList contacts={findContacts()} onDeleteContact={deleteContact} />}
          
        </MainContainer>

        {/* налаштування tostify  */}
        <ToastContainer 
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
    </div>
  );
  
};