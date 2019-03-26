// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, ScrollView, View, Text } from 'react-native';
import { Bar, TabTrack } from '../lib/styles';
import values from '../lib/values';
import Tab from './Tab';
import Indicator from './Indicator';
import type { ContentType } from './Tab/Tab';

type Props = {
  allowFontScaling: boolean,
  selectedIndex: number,
  barColor: string,
  barHeight: number,
  tabWidth: number | string,
  activeTextColor: string,
  indicatorColor: string,
  inactiveTextColor: string,
  scrollable: boolean,
  textStyle: any,
  activeTextStyle: any,
  items: ContentType[],
  uppercase: boolean,
  keyboardShouldPersistTaps: string,
  onChange: (index: number) => void,
};

type State = {
  tabWidth: number,
  barWidth: number,
  indicatorPosition: Animated.Value,
};

const getKeyForTab = (item: ContentType) =>
  typeof item === 'string' ? item : item.key;

export default class MaterialTabs extends React.Component<Props, State> {
  static propTypes = {
    allowFontScaling: PropTypes.bool,
    selectedIndex: PropTypes.number,
    barColor: PropTypes.string,
    barHeight: PropTypes.number,
    tabWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    activeTextColor: PropTypes.string,
    indicatorColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    scrollable: PropTypes.bool,
    textStyle: Text.propTypes.style,
    activeTextStyle: Text.propTypes.style,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    ).isRequired,
    uppercase: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    keyboardShouldPersistTaps: PropTypes.string,
  };

  static defaultProps = {
    allowFontScaling: true,
    selectedIndex: 0,
    barColor: '#13897b',
    barHeight: values.barHeight,
    tabWidth: values.tabWidth,
    activeTextColor: '#fff',
    indicatorColor: '#fff',
    inactiveTextColor: 'rgba(255, 255, 255, 0.7)',
    scrollable: false,
    textStyle: null,
    uppercase: true,
    activeTextStyle: {},
    keyboardShouldPersistTaps: 'never',
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

  componentDidUpdate(prevProps: Props) {
    if (this.props.items.length !== prevProps.items.length) {
      this.bar &&
        this.bar.measure((_, b, width) => {
          this.getTabWidth(width);
        });
    }

    this.selectTab();
  }

  scrollView: ScrollView | null;

  bar: View | null;

  getAnimateValues() {
    const idx = this.props.selectedIndex;
    const { tabWidth, barWidth } = this.state;
    const { length } = this.props.items;

    // All props for fixed tabs are the same
    if (!this.props.scrollable) {
      return {
        indicatorPosition: idx === 0 ? 0 : idx * tabWidth,
        scrollPosition: 0,
      };
    }

    const midpoint = barWidth * 0.5;
    const tabPositionOffset = tabWidth / 2;
    const indicatorPosition = tabWidth * idx;
    const lastIndex = length - 1;
    const contentSize = tabWidth * length;
    const isMaximumScroll = (index: number) =>
      tabWidth * index + barWidth / 2 > contentSize;

    let maximumIndex = 0;

    for (let i = lastIndex; i >= 0 && !maximumIndex; i -= 1) {
      if (!isMaximumScroll(i)) {
        maximumIndex = i;
      }
    }

    if (indicatorPosition < midpoint) {
      // Do not scroll if we have not yet reached the midpoint
      return {
        indicatorPosition,
        scrollPosition: 0,
      };
    }

    return {
      indicatorPosition: midpoint + (indicatorPosition - midpoint),
      scrollPosition:
        idx >= maximumIndex
          ? 'end'
          : indicatorPosition - midpoint + tabPositionOffset,
    };
  }

  getTabWidth(width: number) {
    const userDefinedWidth =
      this.props.tabWidth &&
      MaterialTabs.parseUserDefinedTabWidth(width, this.props.tabWidth);
    const defaultScrollableTabWidth = width * 0.4;

    const tabWidth = this.props.scrollable
      ? userDefinedWidth || defaultScrollableTabWidth
      : width / this.props.items.length;

    this.setState({
      barWidth: width,
      tabWidth,
    });
  }

  static parseUserDefinedTabWidth(barWidth: number, tabWidth: number | string) {
    if (typeof tabWidth === 'number') {
      return tabWidth;
    }

    if (typeof tabWidth === 'string') {
      const isPercentage =
        tabWidth.length > 1 && tabWidth[tabWidth.length - 1] === '%';

      if (isPercentage) {
        const valueWithoutPercentSymbol = tabWidth.slice(
          0,
          tabWidth.length - 1
        );
        const numericPercentValue = parseFloat(valueWithoutPercentSymbol);
        const numericDecimalValue = numericPercentValue / 100;

        return barWidth * numericDecimalValue;
      }

      return parseFloat(tabWidth);
    }

    throw new Error('Unreachable');
  }

  selectTab() {
    Animated.spring(this.state.indicatorPosition, {
      toValue: this.getAnimateValues().indicatorPosition,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();

    const { scrollView } = this;

    if (scrollView) {
      const { scrollPosition } = this.getAnimateValues();

      if (scrollPosition === 'end') {
        scrollView.scrollToEnd();
      } else {
        scrollView.scrollTo({
          x: scrollPosition,
        });
      }
    }
  }

  renderContent() {
    return (
      <Bar
        ref={(ref: View | null) => {
          this.bar = ref;
        }}
        barColor={this.props.barColor}
        barHeight={this.props.barHeight}
        onLayout={event => this.getTabWidth(event.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal
          ref={ref => {
            this.scrollView = ref;
          }}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
          scrollEnabled={this.props.scrollable}
        >
          <TabTrack barHeight={this.props.barHeight}>
            {this.props.items.map((item, idx) => (
              <Tab
                allowFontScaling={this.props.allowFontScaling}
                content={item}
                key={getKeyForTab(item)}
                stretch={!this.props.scrollable}
                onPress={() => this.props.onChange(idx)}
                active={idx === this.props.selectedIndex}
                activeTextColor={this.props.activeTextColor}
                textStyle={this.props.textStyle}
                activeTextStyle={
                  this.props.selectedIndex === idx
                    ? this.props.activeTextStyle
                    : {}
                }
                tabHeight={this.props.barHeight}
                tabWidth={this.state.tabWidth}
                uppercase={this.props.uppercase}
                inActiveTextColor={this.props.inactiveTextColor}
              />
            ))}
          </TabTrack>

          <Indicator
            color={this.props.indicatorColor}
            value={this.state.indicatorPosition}
            tabWidth={this.state.tabWidth}
          />
        </ScrollView>
      </Bar>
    );
  }

  render() {
    return this.props.items ? this.renderContent() : null;
  }
}
