import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Phonebook/ContactForm';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addName = (name, number) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    const keys = this.state.contacts.map(contact =>
      Object.values(contact.name.toLowerCase().split(', ')),
    );
    const arrayOfNames = Object.keys(keys).reduce(function (acc, key) {
      return acc.concat(keys[key]);
    }, []);
    const repeatedName = arrayOfNames.includes(name.toLowerCase());

    if (!repeatedName) {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  onFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter),
    );
  };

  deleteItem = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={s.App}>
        <div className={s.Wrapper}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addName} />

          <h2>Contacts</h2>
          <Filter value={this.state.filter} onSubmit={this.onFilterChange} />
          <ContactList
            contacts={filteredContacts}
            delMethot={this.deleteItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
