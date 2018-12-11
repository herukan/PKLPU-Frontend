import React from 'react';
import ReactDOM from 'react-dom';
import Kendaraan from './Kendaraan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Kendaraan />, div);
  ReactDOM.unmountComponentAtNode(div);
});
