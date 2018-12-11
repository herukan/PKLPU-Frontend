import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './Pengguna';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pengguna />, div);
  ReactDOM.unmountComponentAtNode(div);
});
