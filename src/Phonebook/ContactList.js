import PropTypes from 'prop-types';

const ContactList = ({ contacts, delMethot }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}:{number}
          <button onClick={() => delMethot(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
ContactList.defaultProps = {
  name: '',
  number: '',
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  delMethot: PropTypes.func.isRequired,
};

export default ContactList;
