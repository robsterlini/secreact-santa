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

  return {
    valid: !errors.length,
    errors,
  };
};
