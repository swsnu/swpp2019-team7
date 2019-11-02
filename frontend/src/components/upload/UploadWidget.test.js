import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import ReactDOM from 'react-dom';
import UploadWidget from './UploadWidget';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/reducers/index';


const mockStore = getMockStore({});

describe('UploadWidget', () => {
  let uploadWidget;

  beforeEach(() => {
    uploadWidget = (
        <Provider store={mockStore}>
            <ConnectedRouter history = {history}>
                <UploadWidget />
            </ConnectedRouter>
        </Provider>
    );
  });

  it('should render', () => {
    const component = mount(uploadWidget);
    expect(component.find('.content').length).toBe(1);
  });

  it('test click', () => {
    const component = mount(uploadWidget);
    const wrapper = component.find('#button-id');
    wrapper.simulate('click');
  })

});
