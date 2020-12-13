import PropTypes from 'prop-types';

const Filter = ({ value, onSubmit }) => {
  return (
    <>
      <p>Find contacts by name </p>
      <input type="text" value={value} onChange={onSubmit} />
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Filter;
