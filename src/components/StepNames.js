import React from 'react';

export default class Application extends React.Component {
	render() {
    return (
      <div>
        This is a step!

        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
};
