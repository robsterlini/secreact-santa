import React, { useState, useEffect } from 'react';

import './Fieldset.css';

import { validateField } from './../../utils/form.js';

export default function Fieldset(props) {
  const [errors, setErrors] = useState([]);
  const [value, setValue] = useState(``);
  const [dirty, setDirty] = useState(false);
  const [currentErrors, setCurrentErrors] = useState([]);
  const [init, setInit] = useState(false);

  const {
    id,
  } = props;

  let {
    onFieldEvent,
  } = props;

  if (typeof(onFieldEvent) !== `function`) {
    onFieldEvent = null;
  }

  const {
    label,
    placeholder,
    type = `text`,
  } = props.field;

  useEffect(() => {
    if (typeof(value) === `undefined` || value === ``) {
      setValue(``);
    } else if (props.value !== value) {
      setValue(props.value);
    }
  }, [value, props.value]);

  useEffect(() => {
    // WHY: This will only ever be an array of strings so can be easily compared by joining the two together
    if (errors.join(``) !== currentErrors.join(``)) {
      setCurrentErrors(errors);

      if (onFieldEvent) {
        onFieldEvent(`errors`, id, errors);
      }
    }
  }, [errors, id, onFieldEvent, currentErrors]);

  useEffect(() => {
    if (init) return;

    setInit(true);
    setErrors(validateField(props.value || ``, props.field).errors);

    if (onFieldEvent) {
      onFieldEvent(`init`, id);
    }
  }, [init, props.value, props.field, id, onFieldEvent]);

  const setErrorsWithCustom = (value) => {
    let customValidation = [];

    if (typeof(props.customValidation) === `function`) {
      customValidation = props.customValidation(value);
    }

    setErrors([
      ...customValidation,
      ...validateField(value, props.field).errors,
    ]);
  };

  let dirtyTimeout = null;

  const handleChange = event => {
    clearTimeout(dirtyTimeout);

    const {
      onChangeCallback,
      id,
    } = props;

    const value = event.target.value;

    setValue(value);
    setErrorsWithCustom(value);

    dirtyTimeout = setTimeout(() => {
      setDirty(true);
    }, 1000);

    if (onFieldEvent) {
      onFieldEvent(`change`, id, value);
    }

    if (typeof(onChangeCallback) === `function`) {
      onChangeCallback({
        id,
        value,
        errors,
        valid: errors.length,
      });
    }
  };

  const handleBlur = event => {
    setDirty(true);

    setErrorsWithCustom(event.target.value);
  };

  return (
    <div className="Fieldset">
      {label && (<label htmlFor={props.id}>{label}{props.field.required ? `*` : ``}</label>)}

      <input name={props.id} id={props.id} placeholder={placeholder} type={type} onChange={handleChange} onBlur={handleBlur} value={value} />

      {!!errors.length && dirty && <ul className="Fieldset-errors">
        {errors.map((error, errorIndex) => (
          <li key={errorIndex}>{error}</li>
        ))}
      </ul>}
    </div>
  );
};
