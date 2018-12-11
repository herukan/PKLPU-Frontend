import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './Manifest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Manifest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
