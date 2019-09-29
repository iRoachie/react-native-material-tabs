import React from 'react';
import { View } from 'react-native';
import { create } from 'react-test-renderer';

import Touchable from '../Touchable';

describe('Touchable', () => {
  it('works on iOS', () => {
    const tree = create(
      <Touchable onPress={() => null}>
        <View />
      </Touchable>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('works on android', () => {
    jest.mock('Platform', () => ({
      OS: 'android',
    }));

    const tree = create(
      <Touchable onPress={() => null}>
        <View />
      </Touchable>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
