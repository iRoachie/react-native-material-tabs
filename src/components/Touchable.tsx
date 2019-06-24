import React from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface TouchableProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactChild;
  onPress: () => void;
}

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

export default Touchable;
