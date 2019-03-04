import React from 'react';
import PropTypes from 'prop-types';

class EventList extends React.Component {

  render() {
    let events = this.props.events.map((event, index) => {
      return <div key={index}>{event.description}</div>;
    });

    return (
      <div id="EventList" className="EventList">
        <ul>{events}</ul>
      </div>
    );
  }
}

EventList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EventList;
