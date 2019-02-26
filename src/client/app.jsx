import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };

    this.updateEvents = this.updateEvents.bind(this);
    this.getEvents = this.getEvents.bind(this);
  };

  updateEvents(data) {
    this.setState({
      events: data,
    });
  }

  getEvents() {
    axios.get('http://localhost:3000/events')
      .then(events => {
        // isolate first 10 results
        let eventList = [];
        for (let i = 0; i < 10; i++) {
          eventList.push(events.data[i]);
        }
        this.updateEvents(eventList);
        console.log('pachoo');
      })
      .catch(err => {
        console.log('ERR on data GET', err);
      })
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.events.map(event => {  
            let output = event.description;
            return (
              <li>{output}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;