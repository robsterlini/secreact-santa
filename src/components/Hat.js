import React from 'react';

export default function Hat(props) {
  return (
    <div>
      <h2>Already in the hat</h2>
      {!props.names.length && (<p>None… yet!</p>)}
      {!!props.names.length && (<ul>
        {props.names.map((name, nameIndex) => (
          <li key={nameIndex}>
            <strong>{name.name} ({name.id})</strong><br/>
            <span>{name.email}</span>

            <button onClick={() => this.removeUser(name.id)}>Remove</button>
          </li>
        ))}
      </ul>)}
    </div>
  );
};
