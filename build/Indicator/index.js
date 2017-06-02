import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
const Bar = styled(Animated.View)`
  height: 2
  width: ${props => props.tabWidth}
  position: absolute
  bottom: 0
  backgroundColor: ${props => props.color}
`
const Indicator = props => (
  <Bar
    color={props.color}
    style={{ left: props.value }}
    tabWidth={props.tabWidth}
  />
)
export default Indicator
