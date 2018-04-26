import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import MaterialTabs from '../index';

configure({ adapter: new Adapter() });

let component;
let onChange;

describe('Main', () => {
  beforeEach(() => {
    onChange = jest.fn();
    component = (
      <MaterialTabs
        selectedIndex={0}
        items={['Tab1', 'Tab2']}
        onChange={onChange}
      />
    );
  });

  it('should render without errors', () => {
    const tree = create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with correct tabs', () => {
    const wrapper = shallow(component);
    const tabs = wrapper.find('Tab');

    expect(tabs.length).toBe(2);
  });

  it('should fire onChange event', () => {
    const wrapper = shallow(component);

    wrapper
      .find('Tab')
      .at(1)
      .props()
      .onPress();

    expect(onChange).toBeCalledWith(1);
  });

  it('should change tabs', () => {
    const wrapper = shallow(component);
    let tabs = wrapper.find('Tab');

    // Mock scrollTo function
    wrapper.instance().scrollView = {
      scrollTo: () => {},
    };

    // Assert initial state
    expect(tabs.at(0).props().active).toBe(true);

    wrapper.setProps({ selectedIndex: 1 });
    tabs = wrapper.find('Tab');

    expect(tabs.at(0).props().active).toBe(false);
    expect(tabs.at(1).props().active).toBe(true);
  });

  it('should apply custom fontFamily to tab', () => {
    const textComponent = (
      <MaterialTabs
        selectedIndex={0}
        items={['Tab1', 'Tab2']}
        onChange={onChange}
        textStyle={{ fontFamily: 'Papyrus' }}
      />
    );

    const wrapper = shallow(textComponent);
    const tree = create(textComponent).toJSON();

    const tab = wrapper
      .find('Tab')
      .at(0) // Tab
      .dive() // TabButton
      .children() // TabBody
      .children(); // TabText

    expect(tab.props().style).toEqual({ fontFamily: 'Papyrus' });
    expect(tree).toMatchSnapshot();
  });

  it('should display tab labels not uppercased', () => {
    const tabs = (
      <MaterialTabs
        selectedIndex={0}
        items={['Tab1', 'Tab2']}
        onChange={onChange}
        uppercase={false}
      />
    );

    const tree = create(tabs).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
