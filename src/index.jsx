import reactDOM from 'react-dom';
import React from 'react';
import App from './client/App.jsx';

reactDOM.render(<App perPage={10}/>, document.getElementById('app'));