import styled from 'styled-components/native'
import values from './values'
export const Bar = styled.View`
  backgroundColor: ${props => props.barColor}
  height: ${values.barHeight}
`
