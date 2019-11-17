import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Pill from './Pill';
import { getMockStore } from '../../../test-utils/mocks';
import * as pillActionCreator from '../../../store/actions/pillAction';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<Pill />', () => {
    let mockPill;
  beforeEach(() => {
    mockPill = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Pill id={1}/>
        </Router>
      </Provider>
    );
  });
  it('should render account setting', () => {
    const component = mount(mockPill);
    expect(component.find('.Pill').length).toBe(1)
  });
  it('should delete correctly', () => {
    const component = mount(mockPill);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => { })


    const buttonWrapper = component.find({id: 'delete-button'}).at(1)
    buttonWrapper.simulate('click');
    const spyDelete = jest.spyOn(pillActionCreator, 'deleteUserPill')
        .mockImplementation(()=>{})
    expect(spyPush).toHaveBeenCalledTimes(1);
    //expect(spyDelete).toHaveBeenCalledTimes(1)
  });
});
