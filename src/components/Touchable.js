// @flow

import React from 'react';
import {
  Platform,
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

type TouchableProps = {
  style: ViewStyle,
  onPress: () => void,
  children: React.Element<any>,
};

const Touchable = (props: TouchableProps) =>
  Platform.OS === 'ios'
    ? <TouchableOpacity style={props.style} onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    : <TouchableNativeFeedback onPress={props.onPress}>
        <View style={props.style}>
          {props.children}
        </View>
      </TouchableNativeFeedback>;

export default Touchable;
