// @flow

import * as React from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

type TouchableProps = {
  style?: any,
  children: React.Node,
  onPress: () => void,
};

const Touchable = (props: TouchableProps) =>
  Platform.OS === 'ios' ? (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );

Touchable.defaultProps = {
  style: {},
};

export default Touchable;
