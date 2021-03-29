import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface BarProps {
  tabWidth: number;
  color: string;
  height: number;
}

const Bar = styled(Animated.View)`
  height: ${(props: BarProps) => props.height};
  width: ${(props: BarProps) => props.tabWidth};
  position: absolute;
  bottom: 0;
  background-color: ${(props: BarProps) => props.color};
`;

interface IndicatorProps {
  color: string;
  tabWidth: number;
  value: Animated.Value;
  height: number;
}

const Indicator = (props: IndicatorProps) => (
  <Bar
    color={props.color}
    style={{ transform: [{ translateX: props.value }] }}
    tabWidth={props.tabWidth}
    height={props.height}
  />
);

export default Indicator;
