import { shallow } from 'enzyme';
import React from 'react';
import Navbar from './';

describe('NavBar', () => {
  const wrapper = shallow(<Navbar brand='Lore Tracker'/>);

  it('expect to render navbar component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a brand of Lore Tracker', () => {
    expect(wrapper.find('#brand').text()).toBe('Lore Tracker');
  });
});
