// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, ScrollView, View, Text } from 'react-native';
import type { StyleObj } from '../lib/definitions';
import { Bar, TabTrack } from '../lib/styles';
import values from '../lib/values';
import Tab from './Tab';
import Indicator from './Indicator';

type Props = {
  selectedIndex: number,
  barColor: string,
  barHeight: number,
  barWidth: 0.4,
  activeTextColor: string,
  indicatorColor: string,
  inactiveTextColor: string,
  scrollable: boolean,
  textStyle: StyleObj,
  items: string[],
  onChange: (index: number) => void,
};

type State = {
  tabWidth: number,
  barWidth: number,
  indicatorPosition: Animated.Value,
};

export default class MaterialTabs extends React.Component<Props, State> {
  static propTypes = {
    selectedIndex: PropTypes.number,
    barColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    indicatorColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    barWidth:  PropTypes.number,
    scrollable: PropTypes.bool,
    textStyle: Text.propTypes.style,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedIndex: 0,
    barColor: '#13897b',
    barHeight: values.barHeight,
    barWidth:  0.4,
    activeTextColor: '#fff',
    indicatorColor: '#fff',
    inactiveTextColor: 'rgba(255, 255, 255, 0.7)',
    scrollable: false,
    textStyle: null,
  };

  state = {
    tabWidth: 0,
    barWidth: 0,
    indicatorPosition: new Animated.Value(0),
  };

  shouldComponentUpdate(nextProps: Props) {
    // Prevent scrolling out of bounds
    return (
      nextProps.selectedIndex < nextProps.items.length &&
      nextProps.selectedIndex >= 0
    );
  }

  componentWillUpdate(nextProps: Props) {
    // Recalculate views if the number of items change
    if (nextProps.items.length !== this.props.items.length) {
      this.bar.measure((_, b, width) => {
        this.getTabWidth(width);
      });
    }
  }

  componentDidUpdate() {
    this.selectTab();
  }

  scrollView: ScrollView;
  bar: View;

  getAnimateValues() {
    const idx = this.props.selectedIndex;
    const scrollValue = !this.props.scrollable
      ? this.state.tabWidth
      : this.state.barWidth * this.props.barWidth;

    // All props for fixed tabs are the same
    if (!this.props.scrollable) {
      return {
        indicatorPosition: idx === 0 ? 0 : idx * scrollValue,
        scrollPosition: 0,
      };
    }

    switch (idx) {
      case 0: // First tab
        return {
          indicatorPosition: 0,
          scrollPosition: 0,
        };
      case 1: // Second tab
        return {
          indicatorPosition: this.state.barWidth * 0.5 - scrollValue / 4,
          scrollPosition: scrollValue * 0.25,
        };
      case this.props.items.length - 1: // Last tab
        return {
          indicatorPosition:
            scrollValue * (idx - 1) +
            (this.state.barWidth * 0.5 - scrollValue / 4),
          scrollPosition: scrollValue * (idx - 2) + scrollValue * 0.5,
        };
      default:
        // Any tabs between second and last
        return {
          indicatorPosition:
            scrollValue * (idx - 1) +
            (this.state.barWidth * 0.5 - scrollValue / 4),
          scrollPosition: scrollValue * 0.25 + scrollValue * (idx - 1),
        };
    }
  }

  getTabWidth(width: number) {
    if (!this.props.scrollable) {
      this.setState({ tabWidth: width / this.props.items.length });
    }
    this.setState({
      barWidth: width,
    });
  }

  selectTab() {
    Animated.spring(this.state.indicatorPosition, {
      toValue: this.getAnimateValues().indicatorPosition,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();

    this.scrollView.scrollTo({
      x: this.getAnimateValues().scrollPosition,
    });
  }

  renderContent() {
    return (
      <Bar
        innerRef={ref => (this.bar = ref)}
        barColor={this.props.barColor}
        barHeight={this.props.barHeight}
        onLayout={event => this.getTabWidth(event.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal
          ref={ref => (this.scrollView = ref)}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={this.props.scrollable}
        >
          <TabTrack barHeight={this.props.barHeight}>
            {this.props.items.map((item, idx) => (
              <Tab
                text={item}
                key={item}
                stretch={!this.props.scrollable}
                onPress={() => this.props.onChange(idx)}
                active={idx === this.props.selectedIndex}
                activeTextColor={this.props.activeTextColor}
                textStyle={this.props.textStyle}
                tabHeight={this.props.barHeight}
                tabWidth={
                  !this.props.scrollable
                    ? this.state.tabWidth
                    : this.state.barWidth * this.props.barWidth
                }
                inActiveTextColor={this.props.inactiveTextColor}
              />
            ))}
          </TabTrack>

          <Indicator
            color={this.props.indicatorColor}
            value={this.state.indicatorPosition}
            tabWidth={
              !this.props.scrollable
                ? this.state.tabWidth
                : this.state.barWidth * this.props.barWidth
            }
          />
        </ScrollView>
      </Bar>
    );
  }

  render() {
    return this.props.items ? this.renderContent() : null;
  }
}
