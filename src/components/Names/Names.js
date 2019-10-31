import React, { useState } from 'react';

import { createId } from './../../utils/id.js';
import { setupForm } from './../../utils/form.js';

import Fieldset from './../Fieldset/Fieldset.js';

export default function Names(props) {
  const form = setupForm([
    `name`,
    `email`,
  ], useState);

  const onSubmit = e => {
    e.preventDefault();

    const {
      name,
      email,
    } = form.model;

    addUser({
      name,
      email,
    })
      .then(() => {
        form.reset();
        // nameInput.current.focus();
      })
      .catch(err => {
        console.warn(err);
      });
  };

  const addUser = ({ name, email }) => new Promise((resolve, reject) => {
    if (!form.valid) {
      reject();

      return;
    }

    props.onAddUserCallback({
      id: createId(),
      name,
      email,
    });

    // TODO: Refactor this
    form.reset();

    resolve();
  });

  const customValidationEmail = (value) => {
    const errors = [];

    if (props.users.find(user => user.email === value)) {
      errors.push(`Email already in use for this draw`);
    }

    return errors;
  };

  return (
    <div className="m-names">
      <h2 className="m-names__title">Add a name to the hat…</h2>
      {/*<pre>{JSON.stringify(form, null, 2)}</pre>*/}
      <form onSubmit={onSubmit}>
        <Fieldset field={props.fields.name} id="name" onFieldEvent={form.handleFieldEvent} value={form.model.name} />

        <Fieldset field={props.fields.email} id="email" onFieldEvent={form.handleFieldEvent} value={form.model.email} customValidation={customValidationEmail} />

        <button disabled={!form.valid}>Add user</button>
      </form>
    </div>
  );
};
