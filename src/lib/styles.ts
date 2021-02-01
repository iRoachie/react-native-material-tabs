import styled from 'styled-components/native';

interface BarProps {
  barColor: string;
  barHeight: number;
}

const Bar = styled.View`
  background-color: ${(props: BarProps) => props.barColor};
  height: ${(props: BarProps) => props.barHeight};
`;

interface TabTrackProps {
  barHeight: number;
  indicatorHeight: number;
}

const TabTrack = styled.View`
  flex-direction: row;
  height: ${(props: TabTrackProps) => props.barHeight - props.indicatorHeight};
`;

export { Bar, TabTrack };
