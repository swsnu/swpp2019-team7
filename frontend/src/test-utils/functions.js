import { mount } from 'enzyme';
import { history } from '../store/reducers/index';

export function testPushBehavior(link, mockComponentName, app) {
  history.push(link);
  const component = mount(app);
  expect(component.find(mockComponentName).length).toBe(1);
}


export function bodylessPromise(htmlCode, resolveOrNot) {
  return new Promise((resolve, reject) => {
    const result = {
      status: htmlCode,
    };
    if (resolveOrNot) resolve(result);
    else { reject(result); }
  });
}
export function confirmLoginStatus(spy, expectedLogin, store) {
  const newState = store.getState();
  expect(newState.user.logged_in).toBe(expectedLogin);
  expect(spy).toHaveBeenCalledTimes(1);
}
