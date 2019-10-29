import React from 'react';

import './App.css';

import { createId } from './utils/id.js';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: Object.keys(STEPS)[0],
      names: [],
      name: ``,
      email: ``,
      errors: [],
    };

    this.nameInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    this.addUser(this.state.name, this.state.email)
      .then(() => {
        this.nameInput.current.focus();
      })
      .catch(({ errors }) => {
        this.showErrors(errors);
      });
  };

  showErrors = errors => {
    this.setState(state => ({
      errors,
    }));
  };

  addUser = (name, email) => new Promise((resolve, reject) => {
    const { names } = this.state;

    const existingUserWithEmail = names.find(name => email === name.email);

    if (!name || !email || existingUserWithEmail) {
      const errors = [];

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

      if (existingUserWithEmail) {
        errors.push({
          field: `email`,
          message: `Email already in use for this draw`,
        });
      }

      reject({
        errors,
      });

      return;
    }

    this.setState(state => {
      const { names } = state;

      names.push({
        id: createId(),
        name,
        email,
      });

      return {
        names,
        name: ``,
        email: ``,
      };
    });
  });

  removeUser = id => {
    this.setState(state => ({
      names: state.names.filter(name => name.id !== id),
    }));
  };

  handleChange = ({ id, value }) => {
    this.setState(({ errors }) => ({
      [id]: value,
      errors: errors.filter(error => error.field !== id),
    }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Secre(ac)t Santa</h1>
          <nav>
            <ul>
              {Object.keys(STEPS).map(step => (
                <li key={step}>{`${STEPS[step].title}${step === this.state.step ? ` (current)` : ``}`}</li>
              ))}
            </ul>
          </nav>
        </header>
        <main>

          {/*<StepNames names={this.state.names} />*/}

          <div>
            <h2>Add a name to the hat…</h2>
            <form onSubmit={this.onSubmit}>
              <Fieldset label="Name" id="name" placeholder="Arthur Christmas" errors={this.state.errors} onChangeCallback={this.handleChange} value={this.state.name} />

              <Fieldset label="Email Address" id="email" type="email" placeholder="naughtyornice@north.pole" errors={this.state.errors} onChangeCallback={this.handleChange} value={this.state.email} />

              <button>Add user</button>

              <ul>
              </ul>
            </form>
          </div>

          <Hat names={this.state.names} />

          {/*<ul>
            {this.state.names.map((name, nameIndex) => (
              <li key={nameIndex}>
                <strong>{name.name} ({name.id})</strong><br/>
                <span>{name.email}</span>

                <button onClick={() => this.removeUser(name.id)}>Remove</button>
              </li>
            ))}
          </ul>*/}

          <br/><br/><br/><pre>{ JSON.stringify(this.state, null, 2) }</pre>
        </main>

        <footer>An exploration of React by Rob Sterlini-Aitchison</footer>
      </div>
    );
  }
}

export default App;
