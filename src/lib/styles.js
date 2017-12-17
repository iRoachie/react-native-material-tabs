// @flow

import styled from 'styled-components/native';
import values from './values';

type BarProps = {
  barColor: string,
};

const Bar = styled.View`
  background-color: ${(props: BarProps) => props.barColor};
  height: ${values.barHeight};
`;

const TabTrack = styled.View`
  flex-direction: row;
  height: 46;
`;

export { Bar, TabTrack };
