import React, { useState } from 'react';

import './App.css';

import { drawNamesIntoPairs } from './../../utils/draw.js';

// import StepNames from './components/StepNames.js';
import Names from './../Names/Names.js';
import Hat from './../Hat/Hat.js';

import { FIELDS, PREFILLED_DATA, STEPS } from './models.js';

export default function App(props) {
  const [users, setUsers] = useState(PREFILLED_DATA.users);
  const [pairs, setPairs] = useState([]);

  const [step] = useState(Object.keys(STEPS)[0]);

  const [drawingNames, setDrawingNames] = useState(false);

  const addUser = user => {
    setUsers([...users, user]);
  };

  const removeUser = id => {
    setUsers(users.filter(name => name.id !== id));
  };

  const drawNames = () => {
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
        <Names fields={FIELDS} users={users} onAddUserCallback={addUser} />
        <Hat names={users} onRemoveUserCallback={removeUser} />

        <button onClick={drawNames} disabled={users.length < 3 || drawingNames}>Draw names</button>

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
