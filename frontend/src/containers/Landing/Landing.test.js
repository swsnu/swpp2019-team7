// import React from 'react';
// import { mount } from 'enzyme';
// import { Provider } from 'react-redux';
//
// import { ConnectedRouter } from 'connected-react-router';
// import { history } from '../../store/reducers/index';
// import { getMockStore } from '../../test-utils/mocks';
//
// import Landing from './Landing';
//
// const mockStore = getMockStore();
//
// describe('Landing', () => {
//   let mockLanding;
//   beforeEach(() => {
//     mockLanding = (
//       <Provider store={mockStore}>
//         <ConnectedRouter history={history}>
//           <Landing />
//         </ConnectedRouter>
//       </Provider>
//     );
//   });
//
//   it('should goto login', () => {
//     const spyHistoryPush = jest.spyOn(history, 'push')
//       .mockImplementation(() => {});
//     const component = mount(mockLanding);
//     const wrapper = component.find({ id: 'login-button' });
//     wrapper.simulate('click');
//     expect(spyHistoryPush).toHaveBeenCalledWith('/login');
//   });
//
//   it('should goto signup', () => {
//     const spyHistoryPush = jest.spyOn(history, 'push')
//       .mockImplementation(() => {});
//     const component = mount(mockLanding);
//     const wrapper = component.find({ id: 'signup-button' });
//     wrapper.simulate('click');
//     expect(spyHistoryPush).toHaveBeenCalledWith('/signup');
//   });
// });
