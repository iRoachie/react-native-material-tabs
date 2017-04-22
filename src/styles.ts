import styled from 'styled-components/native'
import values from './values'

interface BarProps {
  barColor: string
}

export const Bar = styled.View`
  backgroundColor: ${(props: BarProps) => props.barColor}
  height: ${values.barHeight}
`
