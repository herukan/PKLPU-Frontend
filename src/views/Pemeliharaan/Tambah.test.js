import React from 'react';
import ReactDOM from 'react-dom';
import Tambah from './Pemeliharaan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tambah />, div);
  ReactDOM.unmountComponentAtNode(div);
});
