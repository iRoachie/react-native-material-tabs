import React, { useState, useEffect } from 'react';
import {
  Animated,
  ScrollView,
  View,
  ScrollViewProps,
  StyleProp,
  TextStyle,
} from 'react-native';

import Tab from './Tab';
import Indicator from './Indicator';
import { ContentType } from './Tab/Tab';

import { Bar, TabTrack } from '../lib/styles';
import values from '../lib/constants';

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

const getKeyForTab = (item: ContentType) =>
  typeof item === 'string' ? item : item.key;

const MaterialTabs: React.FC<Props> = ({
  items,
  selectedIndex,
  scrollable,
  keyboardShouldPersistTaps,
  barHeight,
  onChange,
  allowFontScaling,
  activeTextColor,
  textStyle,
  activeTextStyle,
  inactiveTextColor,
  uppercase,
  indicatorColor,
  barColor,
}) => {
  const [tabWidth, setTabWidth] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [indicatorPosition] = useState(new Animated.Value(0));
  const scrollView = React.createRef<ScrollView>();
  const bar = React.createRef<View>();

  useEffect(() => {
    bar.current &&
      bar.current.measure((_, b, width) => {
        getTabWidth(width);
      });

    selectTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, barWidth]);

  const getAnimateValues = () => {
    const scrollValue = !scrollable ? tabWidth : barWidth * 0.4;

    // All props for fixed tabs are the same
    if (!scrollable) {
      return {
        indicatorPosition:
          selectedIndex === 0 ? 0 : selectedIndex * scrollValue,
        scrollPosition: 0,
      };
    }

    switch (selectedIndex) {
      case 0: // First tab
        return {
          indicatorPosition: 0,
          scrollPosition: 0,
        };
      case 1: // Second tab
        return {
          indicatorPosition: barWidth * 0.5 - scrollValue / 4,
          scrollPosition: scrollValue * 0.25,
        };
      case items.length - 1: // Last tab
        return {
          indicatorPosition:
            scrollValue * (selectedIndex - 1) +
            (barWidth * 0.5 - scrollValue / 4),
          scrollPosition: scrollValue * (selectedIndex - 2) + scrollValue * 0.5,
        };
      default:
        // Any tabs between second and last
        return {
          indicatorPosition:
            scrollValue * (selectedIndex - 1) +
            (barWidth * 0.5 - scrollValue / 4),
          scrollPosition:
            scrollValue * 0.25 + scrollValue * (selectedIndex - 1),
        };
    }
  };

  const getTabWidth = (width: number) => {
    if (!scrollable) {
      setTabWidth(width / items.length);
    }

    setBarWidth(width);
  };

  const selectTab = () => {
    Animated.spring(indicatorPosition, {
      toValue: getAnimateValues().indicatorPosition,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();

    if (scrollView.current) {
      scrollView.current.scrollTo({
        x: getAnimateValues().scrollPosition,
      });
    }
  };

  return (
    items && (
      <Bar
        ref={bar}
        barColor={barColor}
        barHeight={barHeight}
        onLayout={event => getTabWidth(event.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal
          ref={scrollView}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          scrollEnabled={scrollable}
        >
          <TabTrack barHeight={barHeight}>
            {items.map((item, idx) => (
              <Tab
                allowFontScaling={allowFontScaling}
                content={item}
                key={getKeyForTab(item) || undefined}
                onPress={() => onChange(idx)}
                active={idx === selectedIndex}
                activeTextColor={activeTextColor}
                textStyle={textStyle}
                activeTextStyle={selectedIndex === idx && activeTextStyle}
                tabHeight={barHeight}
                tabWidth={!scrollable ? tabWidth : barWidth * 0.4}
                uppercase={uppercase}
                inActiveTextColor={inactiveTextColor}
              />
            ))}
          </TabTrack>

          <Indicator
            color={indicatorColor}
            value={indicatorPosition}
            tabWidth={!scrollable ? tabWidth : barWidth * 0.4}
          />
        </ScrollView>
      </Bar>
    )
  );
};

MaterialTabs.defaultProps = {
  allowFontScaling: true,
  selectedIndex: 0,
  barColor: '#13897b',
  barHeight: values.barHeight,
  activeTextColor: '#fff',
  indicatorColor: '#fff',
  inactiveTextColor: 'rgba(255, 255, 255, 0.7)',
  scrollable: false,
  uppercase: true,
  keyboardShouldPersistTaps: 'never',
};

export default MaterialTabs;
