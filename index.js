// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  Animated,
  Platform
} from 'react-native';

type Props = {
  barColor: string,
  activeTextColor: string,
  indicatorColor: string,
  items: string[],
  selectedIndex: number,
  onChange: (number) => void,
  inactiveTextColor: string
}

type DefaultProps = {
  barColor: string,
  selectedIndex: number,
  activeTextColor: string,
  indicatorColor: string,
  inactiveTextColor: string
}

type State = {
  tabWidth: number,
  indicatorPosition: Animated.Value
}

class MaterialTabs extends Component {
  props: Props;
  static defaultProps: DefaultProps;
  state: State;

  state = {
    tabWidth: 0,
    indicatorPosition: new Animated.Value(0)
  }

  componentDidUpdate() {
    this._selectTab();
  }

  _findDimensions(event) {
    let {width} = event.nativeEvent.layout;

    this.setState({
      tabWidth: width/this.props.items.length
    })
  }

  _selectTab() {
    let {selectedIndex} = this.props;

    Animated.spring(
      this.state.indicatorPosition,
      {
        toValue: selectedIndex === 0 ? 0 : selectedIndex * this.state.tabWidth,
        tension: 100,
        friction: 10
      }
    ).start();
  }

  render() {
    const {tabWidth} = this.state;

    const styles = StyleSheet.create({
      tabBar: {
        backgroundColor: this.props.barColor,
        maxHeight: 48
      },
      tabTrack: {
        minHeight: 46,
        flexDirection: 'row'
      },
      tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      label: {
        color: this.props.inactiveTextColor,
        fontWeight: '500',
        fontSize: 14
      },
      labelSelected: {
        color: this.props.activeTextColor
      },
      indicator: {
        backgroundColor: this.props.indicatorColor,
        width: tabWidth,
        height: 2,
        position: 'absolute',
        bottom: 0
      }
    })

    const tab = (item, idx) => {
      if(Platform.OS === 'android') {
        return (
          <TouchableNativeFeedback key={idx} onPress={() => this.props.onChange(idx)}>
            <View style={styles.tab}>
              <Text style={[styles.label, this.props.selectedIndex === idx ? styles.labelSelected : '']}>{item.toUpperCase()}</Text>
            </View>
          </TouchableNativeFeedback>
        )
      }

      return (
        <TouchableOpacity key={idx} onPress={() => this.props.onChange(idx)}  style={styles.tab}>
          <Text style={[styles.label, this.props.selectedIndex === idx ? styles.labelSelected : '']}>{item.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.tabBar} onLayout={this._findDimensions.bind(this)}>
        <View style={styles.tabTrack}>
          {this.props.items.map((item, idx) => (
            tab(item, idx)
          ))}
        </View>

        <Animated.View style={[styles.indicator, {left: this.state.indicatorPosition}]}/>
      </View>
    )
  }
}

MaterialTabs.defaultProps = {
  barColor: '#13897b',
  indicatorColor: '#fff',
  activeTextColor: '#fff',
  selectedIndex: 0,
  inactiveTextColor: 'rgba(255, 255, 255, 0.7)'
}

export default MaterialTabs;