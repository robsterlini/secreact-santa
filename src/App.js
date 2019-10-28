import React from 'react';

import './App.css';

import { createId } from './utils/id.js';

// import StepNames from './components/StepNames.js';
import Fieldset from './components/Fieldset.js';

const STEPS = [
  `names`,
  `conditions`,
  `draw`,
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: STEPS[0],
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
    this.setState({
      [id]: value,
      errors: [],
    });
  }

  render() {
    return (
      <div className="App">
        <header>Secre(ac)t Santa</header>
        <main>

          {/*<StepNames names={this.state.names} />*/}

          <form onSubmit={this.onSubmit}>
            <Fieldset label="Name" id="name" placeholder="Arthur Christmas" errors={this.state.errors} onChangeCallback={this.handleChange} value={this.state.name} />

            <Fieldset label="Email Address" id="email" type="email" placeholder="naughtyornice@north.pole" errors={this.state.errors} onChangeCallback={this.handleChange} value={this.state.email} />

            <button>Add user</button>

            <ul>
            </ul>
          </form>

          <ul>
            {this.state.names.map((name, nameIndex) => (
              <li key={nameIndex}>
                <strong>{name.name} ({name.id})</strong><br/>
                <span>{name.email}</span>

                <button onClick={() => this.removeUser(name.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <pre>{ JSON.stringify(this.state, null, 2) }</pre>
        </main>

        <footer>An exploration of React by Rob Sterlini-Aitchison</footer>
      </div>
    );
  }
}

export default App;
