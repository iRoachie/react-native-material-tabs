// @flow

import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import values from '../lib/values';

type BarProps = {
  tabWidth: number,
  color: string,
};

const Bar = styled(Animated.View)`
  height: ${values.indicatorHeight};
  width: ${(props: BarProps) => props.tabWidth};
  position: absolute;
  bottom: 0;
  background-color: ${(props: BarProps) => props.color};
`;

type IndicatorProps = {
  color: string,
  tabWidth: number,
  value: Animated.Value,
};

const Indicator = (props: IndicatorProps) => (
  <Bar
    color={props.color}
    style={{ transform: [{ translateX: props.value }] }}
    tabWidth={props.tabWidth}
  />
);

export default Indicator;
