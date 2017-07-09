// @flow

import styled from 'styled-components/native';
import values from './values';

type BarProps = {
  barColor: string,
};

const Bar = styled.View`
  backgroundColor: ${(props: BarProps) => props.barColor}
  height: ${values.barHeight}
`;

const TabTrack = styled.View`
  flexDirection: row
  height: 46
`;

export { Bar, TabTrack };
