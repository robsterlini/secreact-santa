import React, { useState } from 'react';

import './App.css';

import { createId } from './utils/id.js';
import { stringIsEmail } from './utils/string.js';

// import StepNames from './components/StepNames.js';
import Fieldset from './components/Fieldset.js';
import Hat from './components/Hat.js';

const STEPS = {
  names: {
    title: `Fill the hat`,
  },
  conditions: {
    title: `Set the rules`,
  },
  draw: {
    title: `Draw the names`,
  },
};

function App(props) {
  const [formFieldName, setFormFieldName] = useState(``);
  const [formFieldEmail, setFormFieldEmail] = useState(``);

  const [formErrors, setFormErrors] = useState([]);

  const [users, setUsers] = useState([]);

  const [step] = useState(Object.keys(STEPS)[0]);

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
    const errors = [];

    const existingUserWithEmail = users.find(name => email === name.email);
    if (existingUserWithEmail) {
      errors.push({
        field: `email`,
        message: `Email already in use for this draw`,
      });
    }

    if (!name) {
      errors.push({
        field: `name`,
        message: `Name is required`,
      });
    }

    if (!email) {
      errors.push({
        field: `email`,
        message: `Email is required`,
      });
    }

    if (!stringIsEmail(email)) {
      errors.push({
        field: `email`,
        message: `Email is invalid`,
      });
    }

    console.log(`ADD USER`, name, email, errors);

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

        {/*<StepNames names={users} />*/}

        <div>
          <h2>Add a name to the hat…</h2>
          <form onSubmit={onSubmit}>
            <Fieldset label="Name" id="name" placeholder="Arthur Christmas" errors={formErrors} onChangeCallback={handleChange} value={formFieldName} />

            <Fieldset label="Email Address" id="email" type="email" placeholder="naughtyornice@north.pole" errors={formErrors} onChangeCallback={handleChange} value={formFieldEmail} />

            <button>Add user</button>

            <ul>
            </ul>
          </form>
        </div>

        <Hat names={users} onRemoveCallback={removeUser} />

        <br/><br/><br/><pre>{ JSON.stringify(``, null, 2) }</pre>
      </main>

      <footer>An exploration of React by Rob Sterlini-Aitchison</footer>
    </div>
  );
}

export default App;
