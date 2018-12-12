// @flow

import styled from 'styled-components/native';

import values from './values';

type BarProps = {
  barColor: string,
  barHeight: number,
};

const Bar = styled.View`
  background-color: ${(props: BarProps) => props.barColor};
  height: ${(props: BarProps) => props.barHeight};
`;

const TabTrack = styled.View`
  flex-direction: row;
  height: ${(props: BarProps) => props.barHeight - values.indicatorHeight};
`;

export { Bar, TabTrack };
