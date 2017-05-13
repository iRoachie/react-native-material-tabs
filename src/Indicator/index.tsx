import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

interface IndicatorProps {
  color: string
  tabWidth: number
  value?: Animated.Value
  style?: any
}

const Bar = styled(Animated.View)`
  height: 2
  width: ${(props: IndicatorProps) => props.tabWidth}
  position: absolute
  bottom: 0
  backgroundColor: ${(props: IndicatorProps) => props.color}
`

const Indicator: React.SFC<IndicatorProps> = (props) => (
  <Bar color={props.color} style={{left: props.value}} tabWidth={props.tabWidth}/>
)

export default Indicator
