import React, { useState, useEffect } from 'react';

import './App.css';

import { createId } from './../../utils/id.js';
import { drawNamesIntoPairs } from './../../utils/draw.js';
import { validateField } from './../../utils/form.js';

// import StepNames from './components/StepNames.js';
import Fieldset from './../Fieldset/Fieldset.js';
import Hat from './../Hat/Hat.js';

import { FIELDS, PREFILLED_DATA, STEPS } from './models.js';

export default function App(props) {
  const [formFieldName, setFormFieldName] = useState(``);
  const [formFieldEmail, setFormFieldEmail] = useState(``);

  const [formErrors, setFormErrors] = useState([]);
  const [formValid, setFormValid] = useState(false);

  const [users, setUsers] = useState(PREFILLED_DATA.users);
  const [pairs, setPairs] = useState([]);

  const [step] = useState(Object.keys(STEPS)[0]);

  const [drawingNames, setDrawingNames] = useState(false);

  useEffect(() => {
    const nameValid = validateField(formFieldName, FIELDS.name);
    const emailValid = validateField(formFieldEmail, FIELDS.email);

    setFormValid(nameValid.valid && emailValid.valid);
  }, [formFieldName, formFieldEmail]);

  // const nameInput = React.createRef;

  const onSubmit = e => {
    e.preventDefault();

    addUser({
      name: formFieldName,
      email: formFieldEmail,
    })
      .then(() => {
        // nameInput.current.focus();
      })
      .catch(({ errors }) => {
        showErrors(errors);
      });
  };

  const showErrors = errors => {
    setFormErrors(errors);
  };

  const addUser = ({ name, email }) => new Promise((resolve, reject) => {

    const convertErrorsToFieldErrors = (id, errors2) => (errors2.map(error => ({
      field: id,
      message: error,
    })));

    const errors = [
      ...convertErrorsToFieldErrors(`name`, validateField(name, FIELDS.name).errors),
      ...convertErrorsToFieldErrors(`email`, validateField(email, FIELDS.email).errors),
    ];

    const existingUserWithEmail = users.find(name => email === name.email);
    if (existingUserWithEmail) {
      errors.push({
        field: `email`,
        message: `Email already in use for this draw`,
      });
    }

    if (errors.length) {
      reject({
        errors,
      });

      return;
    }

    setUsers([
      ...users,
      {
        id: createId(),
        name,
        email,
      },
    ]);

    setFormFieldName(``);
    setFormFieldEmail(``);
  });

  const removeUser = id => {
    setUsers(users.filter(name => name.id !== id));
  };

  const handleChange = ({ id, value }) => {
    const formSetters = {
      name: setFormFieldName,
      email: setFormFieldEmail,
    };

    formSetters[id](value);

    setFormErrors(formErrors.filter(error => error.field !== id));
  }

  const drawNames = () => {
    console.log(`DRAW NAMES`);
    setDrawingNames(true);

    setPairs(drawNamesIntoPairs(users));
  };

  return (
    <div className="App">
      <header>
        <h1>Secre(ac)t Santa</h1>
        <nav>
          <ul>
            {Object.keys(STEPS).map(s => (
              <li key={s}>{`${STEPS[s].title}${s === step ? ` (current)` : ``}`}</li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <div>
          <h2>Add a name to the hat…</h2>
          <form onSubmit={onSubmit}>
            <Fieldset field={FIELDS.name} id="name" errors={formErrors} onChangeCallback={handleChange} value={formFieldName} />

            <Fieldset field={FIELDS.email} id="email" errors={formErrors} onChangeCallback={handleChange} value={formFieldEmail} />

            <button disabled={!formValid || drawingNames}>Add user</button>
          </form>
        </div>

        {/* HAT */}
        <Hat names={users} onRemoveCallback={removeUser} />

        <button onClick={drawNames} disabled={users.length < 3 || drawingNames}>Draw names</button>

        {/* Pairs */}
        <div>
          <ul>
            {pairs.map(pair => (
              <li key={pair.id}>
                <span>{pair.giver.name}</span>
                ->
                <span>{pair.reciever.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <br/><br/><br/><pre>{ JSON.stringify(pairs, null, 2) }</pre>
      </main>

      <footer>An exploration of React by Rob Sterlini-Aitchison</footer>
    </div>
  );
}
