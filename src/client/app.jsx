import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      omo: 'omo'
    };
  };

  render() {
    return (
      <div>
        {this.state.omo}
      </div>
    );
  }
}

export default App;