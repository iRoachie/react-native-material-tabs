import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { create } from 'react-test-renderer';
import { configure } from 'enzyme';
import { Text } from 'react-native';

import Tab from '../Tab';

configure({ adapter: new Adapter() });

describe('Components | Tab', () => {
  describe('when content is react element', () => {
    it('renders content', () => {
      const component = (
        <Tab
          allowFontScaling
          content={<Text>hi</Text>}
          tabWidth={100}
          tabHeight={100}
          activeTextColor="red"
          inActiveTextColor="green"
          textStyle={false}
          uppercase
        />
      );
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when content is string', () => {
    it('renders text tab', () => {
      const component = (
        <Tab
          allowFontScaling
          content="text"
          tabWidth={100}
          tabHeight={100}
          activeTextColor="red"
          inActiveTextColor="green"
          textStyle={false}
          uppercase
        />
      );
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
