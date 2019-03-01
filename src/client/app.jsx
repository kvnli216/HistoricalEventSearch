import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Search from './Search.jsx';
import EventList from './EventList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      offset: 0,
      eventCount: 0,
    };

    this.updateEvents = this.updateEvents.bind(this);
    this.updateEventCount = this.updateEventCount.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  };

  updateEvents(data) {
    this.setState({
      events: data,
    });
  }

  updateEventCount(num) {
    this.setState({
      eventCount: num
    });
  }
  
  componentDidMount() {
    // this.getEvents();
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    // this.setState({ offset: offset }, () => {
    //   this.getEvents();
    // });
  };

  render() {
    return (
      <div>
        <Search events={this.state.events} eventCount={this.state.eventCount} updateEvents={this.updateEvents} updateEventCount={this.updateEventCount} />
        <EventList events={this.state.events}/>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(this.state.eventCount / this.props.perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;
