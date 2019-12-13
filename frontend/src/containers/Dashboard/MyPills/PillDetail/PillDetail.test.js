import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PillDetail from './PillDetail';
import { getMockStore, stubPill1, stubPill2 } from '../../../../test-utils/mocks';

const stubPillState = {
  user_id: -1,
  pill_list: [stubPill1, stubPill2],
  selected_pill: stubPill1,
};
const mockStore = getMockStore('pill', stubPillState);

const history = createBrowserHistory();

describe('<MyPills />', () => {
  let mockPillDetail;
  beforeEach(() => {
    console.log(mockStore);
    mockPillDetail = (
      <Provider store={mockStore}>
        <Router history={history}>
          <PillDetail />
        </Router>
      </Provider>
    );
  });
  it('should render PillDetail', () => {
    const component = mount(mockPillDetail);
    expect(component.find('.PillDetail').length).toBe(1);
  });
  it('should go back when clicking button', () => {
    const component = mount(mockPillDetail);
    const wrapperButton = component.find({ id: 'back-detail-article-button' }).at(0);

    wrapperButton.simulate('click');
  });
  it('askUpload', () => {
    const component = mount(mockPillDetail);
    const wrapperButton = component.find({ id: 'askUpload' }).at(0);

    wrapperButton.simulate('click');
  });
});
