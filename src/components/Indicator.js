// @flow

import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import styled from 'styled-components';

type BarProps = {
  tabWidth: number,
  color: string,
};

const Bar = styled(Animated.View)`
  height: 2;
  width: ${(props: BarProps) => props.tabWidth};
  position: absolute;
  bottom: 0;
  background-color: ${(props: BarProps) => props.color};
`;

type IndicatorProps = {
  color: string,
  tabWidth: number,
  value?: Animated.Value,
  style?: ViewStyle,
};

const Indicator = (props: IndicatorProps) => (
  <Bar
    color={props.color}
    style={{ transform: [{ translateX: props.value }] }}
    tabWidth={props.tabWidth}
  />
);

export default Indicator;
