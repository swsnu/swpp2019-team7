import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MyPills from './MyPills';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<MyPills />', () => {
  let mockMyPills;
  beforeEach(() => {
    mockMyPills = (
      <Provider store={mockStore}>
        <Router history={history}>
          <MyPills id={1} />
        </Router>
      </Provider>
    );
  });
  it('should render MyPills', () => {
    const component = mount(mockMyPills);
    expect(component.find('.MyPills').length).toBe(1);
  });
  it('should add by photo', () => {
    const component = mount(mockMyPills);
    const wrapperButton = component.find({ id: 'addpill' }).at(0);
    const dialog = component.find({ id: 'dialog' }).at(0);
    wrapperButton.simulate('click');

    expect(dialog.length).toBe(1);

    const buttonClose = component.find({ id: 'close-dialog' }).at(0);
    buttonClose.simulate('click');
  });
  it('should add manually', () => {
    const component = mount(mockMyPills);
    const buttonWrapper = component.find({ id: 'addpillManually' }).at(0);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => { });

    buttonWrapper.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
  });
});
