import React from 'react';

export default function Hat(props) {
  const removeUser = id => {
    const {
      onRemoveCallback,
    } = props;

    if (typeof(onRemoveCallback) === `function`) {
      onRemoveCallback(id);
    }
  };

  return (
    <div className="m-hat">
      <h2 className="m-hat__title">Already in the hat</h2>
      {!props.names.length && (<p className="m-hat__no-results">None… yet!</p>)}
      {!!props.names.length && (<ul className="m-hat__list">
        {props.names.map((name, nameIndex) => (
          <li className="m-hat__item" key={nameIndex}>
            <span className="m-hat__name">{name.name}</span>
            <span className="m-hat__email">{name.email}</span>

            <button className="m-hat__remove" onClick={() => removeUser(name.id)}>Remove</button>
          </li>
        ))}
      </ul>)}
    </div>
  );
};
