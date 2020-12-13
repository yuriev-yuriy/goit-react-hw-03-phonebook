import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import s from '../App.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  reset() {
    this.setState({ name: '', number: '' });
  }

  changeNameInput = event => {
    this.setState({ name: event.currentTarget.value });
  };

  changeNumberInput = event => {
    this.setState({ number: event.currentTarget.value });
  };

  makeSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.number);
    this.reset();
  };

  render() {
    return (
      <>
        <form onSubmit={this.makeSubmit}>
          <label htmlFor={this.nameInputId}>
            Name
            <input
              id={this.nameInputId}
              type="text"
              value={this.state.name}
              onChange={this.changeNameInput}
              required
            />
          </label>

          <label htmlFor={this.numberInputId}>
            Number
            <input
              id={this.numberInputId}
              type="tel"
              value={this.state.number}
              onChange={this.changeNumberInput}
              required
            />
          </label>
          <button className={s.Btn} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
