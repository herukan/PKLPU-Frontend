import React from 'react';
import ReactDOM from 'react-dom';
import Peminjaman from './Peminjaman';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Peminjaman />, div);
  ReactDOM.unmountComponentAtNode(div);
});
