import { createSlice, nanoid } from '@reduxjs/toolkit'

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState:  [
        {id: nanoid(5), name: 'Matt Mordock', number: '459-12-56'},
        {id: nanoid(5), name: 'Peter Parker', number: '443-89-12'},
        {id: nanoid(5), name: 'Tony Stark', number: '645-17-79'},
        { id: nanoid(5), name: 'Kristina Mae', number: '227-91-26' }],
        
    
    reducers: {
        addContact(state, action) {
            state.push(action.payload)
        },
        removeContact(state, action) {
            return state.filter(el => el.id !== action.payload);
        },
    }
});

export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;

// selector
export const getContacts = state => state.contacts.contacts;
