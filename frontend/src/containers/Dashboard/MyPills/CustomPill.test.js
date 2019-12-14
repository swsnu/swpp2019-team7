import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CustomPill from './CustomPill';
import { getMockStore, getMockStoreCustomPill } from '../../../test-utils/mocks';
import * as pillActionCreator from '../../../store/actions/pillAction';
// import * as pillActionCreator from '../../../store/actions/pillAction';

const mockStore = getMockStore();
const mockStoreCustom = getMockStoreCustomPill();
const history = createBrowserHistory();

describe('<CustomPill />', () => {
  let mockCustomPill;
  let mockCustomPillNorender;
  let spyAddCustomPill;

  beforeEach(() => {
    spyAddCustomPill = jest.spyOn(pillActionCreator, 'addCustomPill')
      .mockImplementation(() => ({ type: 'ADD_CUSTOM_PILL' }));
    mockCustomPill = (
      <Provider store={mockStoreCustom}>
        <Router history={history}>
          <CustomPill />
        </Router>
      </Provider>
    );
    mockCustomPillNorender = (
      <Provider store={mockStore}>
        <Router history={history}>
          <CustomPill />
        </Router>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render CustomPill', () => {
    const component = mount(mockCustomPill);
    expect(component.find('.CustomPill').length).toBe(1);
  });
  it('should Show changes', () => {
    const component = mount(mockCustomPill);

    const wrapperPillname = component.find({ id: '1' }).at(1);
    const wrapperMethod = component.find({ id: '2' }).at(1);
    const wrapperExpiry = component.find({ id: '3' }).at(1);
    const wrapperFunction = component.find({ id: '4' }).at(1);
    const wrapperStore = component.find({ id: '5' }).at(1);
    const wrapperCompany = component.find({ id: '6' }).at(1);
    const wrapperStandard = component.find({ id: '7' }).at(1);
    const wrapperPrecaution = component.find({ id: '8' }).at(1);
    const wrapperButton = component.find({ id: 'confirm_button' }).at(1);

    wrapperPillname.props().onChange({ target: { value: 'pwd*' } });
    wrapperMethod.props().onChange({ target: { value: 'pwd*' } });
    wrapperExpiry.props().onChange({ target: { value: 'pwd*' } });
    wrapperFunction.props().onChange({ target: { value: 'pwd*' } });
    wrapperStore.props().onChange({ target: { value: 'pwd*' } });
    wrapperCompany.props().onChange({ target: { value: 'pwd*' } });
    wrapperStandard.props().onChange({ target: { value: 'pwd*' } });
    wrapperPrecaution.props().onChange({ target: { value: 'pwd*' } });
    wrapperButton.simulate('click');

    expect(spyAddCustomPill).toHaveBeenCalledTimes(1);
  });

  it('should not accept change without username', () => {
    const component = mount(mockCustomPill);

    const wrapperPillname = component.find({ id: '1' }).at(1);
    const wrapperMethod = component.find({ id: '2' }).at(1);
    const wrapperButton = component.find({ id: 'confirm_button' }).at(1);

    wrapperButton.simulate('click');

    expect(spyAddCustomPill).toHaveBeenCalledTimes(0);

    wrapperMethod.props().onChange({ target: { value: 'asdf' } });
    wrapperButton.simulate('click');

    expect(spyAddCustomPill).toHaveBeenCalledTimes(0);
    wrapperPillname.props().onChange({ target: { value: 'asdf' } });
    wrapperButton.simulate('click');

    expect(spyAddCustomPill).toHaveBeenCalledTimes(1);
  });

  xit('should not render custom pill without button click', () => {
    const component = mount(mockCustomPillNorender);
    expect(component.find('.CustomPill').length).toBe(0);
  });
});
