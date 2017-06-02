import React from 'react'
import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
class Touchable extends React.Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      )
    }
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={this.props.style}>
          {this.props.children}
        </View>
      </TouchableNativeFeedback>
    )
  }
}
export default Touchable
