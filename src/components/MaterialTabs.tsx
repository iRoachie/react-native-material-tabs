import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  ScrollView,
  View,
  ScrollViewProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Bar, TabTrack } from '../lib/styles';
import values from '../lib/constants';
import Tab from './Tab';
import Indicator from './Indicator';
import { ContentType } from './Tab/Tab';

interface Props extends Pick<ScrollViewProps, 'keyboardShouldPersistTaps'> {
  allowFontScaling: boolean;
  selectedIndex: number;
  barColor: string;
  barHeight: number;
  activeTextColor: string;
  indicatorColor: string;
  inactiveTextColor: string;
  scrollable: boolean;
  textStyle: StyleProp<TextStyle>;
  activeTextStyle: StyleProp<TextStyle>;
  items: ContentType[];
  uppercase: boolean;
  onChange(index: number): void;
}

type State = {
  tabWidth: number;
  barWidth: number;
  indicatorPosition: Animated.Value;
};

const getKeyForTab = (item: ContentType) =>
  typeof item === 'string' ? item : item.key;

export default class MaterialTabs extends React.Component<Props, State> {
  static propTypes = {
    allowFontScaling: PropTypes.bool,
    selectedIndex: PropTypes.number,
    barColor: PropTypes.string,
    barHeight: PropTypes.number,
    activeTextColor: PropTypes.string,
    indicatorColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    scrollable: PropTypes.bool,
    textStyle: PropTypes.object,
    activeTextStyle: PropTypes.object,
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
    const scrollValue = !this.props.scrollable
      ? this.state.tabWidth
      : this.state.barWidth * 0.4;

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

    if (this.scrollView) {
      this.scrollView.scrollTo({
        x: this.getAnimateValues().scrollPosition,
      });
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
                key={getKeyForTab(item) || undefined}
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
                tabWidth={
                  !this.props.scrollable
                    ? this.state.tabWidth
                    : this.state.barWidth * 0.4
                }
                uppercase={this.props.uppercase}
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
                : this.state.barWidth * 0.4
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
