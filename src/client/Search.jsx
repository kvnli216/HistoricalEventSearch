import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: '',
    };

    this.updateForm = this.updateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateForm(e) {
    this.setState({
      form: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handlesubmit', this.state.form);
    axios.get(`http://localhost:3000/events?q=${this.state.form}`)
      .then(events => {
        let data = events.data;
        this.props.updateEvents(data);
        this.props.updateEventCount(data.length);
      })
      .catch(err => {
        console.log('ERR on data GET', err);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='string' value={this.state.form} onChange={this.updateForm}></input>
      </form>
    );
  }
}

export default Search;
