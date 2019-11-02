// src/setupTests.js
// eslint-disable-next-line import/no-extraneous-dependencies
import Enzyme from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});
