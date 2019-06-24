import styled from 'styled-components/native';
import constants from './constants';

interface BarProps {
  barColor: string;
  barHeight: number;
}

const Bar = styled.View`
  background-color: ${(props: BarProps) => props.barColor};
  height: ${(props: BarProps) => props.barHeight};
`;

const TabTrack = styled.View`
  flex-direction: row;
  height: ${(props: Pick<BarProps, 'barHeight'>) =>
    props.barHeight - constants.indicatorHeight};
`;

export { Bar, TabTrack };
