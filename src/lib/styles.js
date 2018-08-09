// @flow

import styled from 'styled-components';

type BarProps = {
  barColor: string,
  barHeight: number,
};

type TabProps = {
  barHeight: number,
};

const Bar = styled.View`
  background-color: ${(props: BarProps) => props.barColor};
  height: ${(props: BarProps) => props.barHeight};
`;

const TabTrack = styled.View`
  flex-direction: row;
  height: ${(props: BarProps) => props.barHeight - 2};
`;

export { Bar, TabTrack };
