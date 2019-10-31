import { stringIsEmail } from './string.js';

export const validateField = (value, field) => {
  const errors = [];

  const {
    type = `text`,
  } = field;

  let hasValue = !!value;

  if (type === `number`) {
    hasValue = typeof(value) !== `number`;
  }

  if (hasValue) {
    if (field.type === `email` && !stringIsEmail(value)) {
      errors.push(`Invalid email`);
    }
  }

  else {
    if (field.required) {
      errors.push(`${field.label} is required`);
    }
  }

  if (field.customValidation && typeof(field.customValidation) === `function`) {
    errors.push(`Custom validation here`);
  }

  return {
    valid: !errors.length,
    errors,
  };
};

export const setupForm = (fields, useState) => {

  const setModel = (field, value) => form.fields[field].setModel(value);
  const setErrors = (field, errors) => form.fields[field].setErrors(errors);

  const reset = () => {
    fields.forEach(field => {
      setModel(field, ``);
    });
  };

  const handleFieldEvent = (eventName, id, arg) => {

    if (eventName === `change`) {
      setModel(id, arg);
    }

    else if (eventName === `errors`) {
      setErrors(id, arg);
    }
  };

  const form = {
    valid: true,
    model: {},
    errors: {},
    fields: {},
    setModel,
    setErrors,
    reset,
    handleFieldEvent,
  };

  fields.forEach(field => {
    const [model, setModel] = useState(``);
    const [errors, setErrors] = useState([]);

    form.fields[field] = {
      model,
      setModel,
      errors,
      setErrors,
    };

    form.model[field] = model;
    form.errors[field] = errors;

    if (errors.length) {
      form.valid = false;
    }
  });

  return form;
};
