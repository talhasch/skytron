import { initialState } from './index';

let state = initialState;

it('1- default state', () => {
  expect(state).toMatchSnapshot();
});
