import App from './App';
import Enzyme, {shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
  return shallow(<App { ...props }/>)
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 *
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  // Make the assertion
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");  // do this first with an integer and show failure!
});

test('counter increments when button is clicked', () => {
  const wrapper = setup();

  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  // check the counter
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
});

describe('Decrement button',()=> {
  test('Render Decrement counter button', ()=> {
    const wrapper = setup();

    const button = findByTestAttr(wrapper,'decrement-button');
    expect(button.length).toBe(1);
  })

  test('Only decrements till 0', ()=>{
    const wrapper = setup();

    const buttonInr = findByTestAttr(wrapper, 'increment-button');
    buttonInr.simulate('click');

    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');

    // check the counter
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0")
  })
});

describe('Render Error', ()=> {
  test('Error is hidden on load', ()=> {
    const wrapper = setup();

    const error = findByTestAttr(wrapper,'error');
    expect(error.length).toBe(0);
  });
  test('Error is visible when count is going to be less then 0', ()=> {
    const wrapper = setup();

    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    const error = findByTestAttr(wrapper,'error');
    expect(error.length).toBe(1);
  });

  test('Error is hidden after click of increment button', ()=> {
    const wrapper = setup();

    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    const buttonInr = findByTestAttr(wrapper, 'increment-button');
    buttonInr.simulate('click');

    const error = findByTestAttr(wrapper,'error');
    expect(error.length).toBe(0);
  });
})