import styled from 'styled-components/native'
import {Platform} from 'react-native'
import Button from '../Touchable'
import values from '../values'

export const TabBody = styled.View`
  height: ${values.barHeight}
  alignItems: center
  justifyContent: center
  paddingHorizontal: 12
`

interface TabButtonProps {
  tabWidth: number
  stretch: boolean
}

export const TabButton = styled(Button)`
  width: ${(props: TabButtonProps) => props.tabWidth}
`

interface TabTextProps {
  color: string
}

export const IconStyle = {
  fontSize: 28,
  height: 30
}

export const TabText = styled.Text`
  color: ${(props: TabTextProps) => props.color}
  fontWeight: ${Platform.OS === 'ios' ? 500 : 400}
  fontFamily: ${Platform.OS === 'android' ? 'sans-serif-medium' : 'System'}
  fontSize: 14
  textAlign: center
  minWidth: 100%
`
