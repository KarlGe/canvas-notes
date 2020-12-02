import React, { useState, ReactElement, useEffect } from 'react';
import PropTypes from 'prop-types';

function EditableField(props: {
  value: string;
  children: ReactElement;
  onChange: Function;
  className: string;
}) {
  const { className, value, children, onChange } = props;
  const [editing, setEditing] = useState(false);

  const stopEditing = (e) => {
    if (e.key && e.key !== 'Enter') {
      return;
    }
    setEditing(false);
  };

  useEffect(() => {
    window.addEventListener('click', stopEditing);
    window.addEventListener('keyup', stopEditing);
    return () => {
      window.removeEventListener('click', stopEditing);
      window.removeEventListener('keyup', stopEditing);
    };
  }, []);

  return editing ? (
    <div className={className}>
      <input
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  ) : (
    <span
      className={className}
      onClick={(e) => {
        setEditing(true);
        e.stopPropagation();
      }}
    >
      {children}
    </span>
  );
}

EditableField.propTypes = {};
EditableField.defaultProps = {
  className: '',
};

export default EditableField;
