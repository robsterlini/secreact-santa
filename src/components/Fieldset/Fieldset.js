import React, { useState, useEffect } from 'react';

import './Fieldset.css';

export default function Fieldset(props) {
  const [errors, setErrors] = useState(props.errors);
  const [value, setValue] = useState(props.value);

  const {
    label,
    placeholder,
    type = `text`,
  } = props.field;

  useEffect(() => {
    setErrors(props.errors.filter(error => error.field === props.id));

    if (props.value !== value) {
      setValue(props.value);
    }
  }, [props.errors, props.id, value, props.value]);

  const handleChange = event => {
    const {
      onChangeCallback,
      id,
    } = props;

    setValue(event.target.value);

    if (typeof(onChangeCallback) === `function`) {
      onChangeCallback({
        id,
        value: event.target.value,
      });
    }
  };

  return (
    <div className="Fieldset">
      {label && (<label htmlFor={props.id}>{label}</label>)}

      <input id={props.id} placeholder={placeholder} type={type} onChange={handleChange} value={value} />

      {!!errors.length && <ul className="Fieldset-errors">
        {errors.map((error, errorIndex) => (
          <li key={errorIndex}>{error.message}</li>
        ))}
      </ul>}
    </div>
  );
};
