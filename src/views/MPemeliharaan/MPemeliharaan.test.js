import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './MPemeliharaan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MPemeliharaan />, div);
  ReactDOM.unmountComponentAtNode(div);
});
