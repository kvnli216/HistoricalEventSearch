import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Search from './Search.jsx';
import EventList from './EventList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [{description: 'Fill in the search form to look up historical events! (e.g. king, pilgrim...etc)'}],
      eventCount: 0,
      pageNumber: 1,
      searchText: '',
    };

    this.updateEvents = this.updateEvents.bind(this);
    this.updateEventCount = this.updateEventCount.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.requestEvents = this.requestEvents.bind(this);
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

  updateSearchText(text) {
    this.setState({
      searchText: text
    });
  }
  
  requestEvents() {
    const { searchText, pageNumber } = this.state;

    axios.get(`http://localhost:3000/events?q=${searchText}&_page=${pageNumber}`)
      .then(res => {
        this.updateEvents(res.data);
        this.updateEventCount(res.headers['x-total-count']);
      })
      .catch(err => {
        console.log('ERR on data GET', err);
      })
  }

  handlePageClick(data) {
    let selected = data.selected + 1;
    this.setState({ pageNumber: selected }, () => {this.requestEvents()});
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className='container'>
        <h1 className='title'>Historical Event Database</h1>
        <Search 
          events={this.state.events}
          eventCount={this.state.eventCount}
          pageNumber={this.state.pageNumber}
          searchText={this.state.searchText}
          updateEvents={this.updateEvents}
          updateEventCount={this.updateEventCount}
          updateSearchText={this.updateSearchText}
          requestEvents={this.requestEvents}
        />
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
