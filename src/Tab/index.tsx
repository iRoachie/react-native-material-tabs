import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  TabText,
  TabBody,
  TabButton
} from './styles'


interface TabProps {
  text: string
  tabWidth: number
  stretch: boolean
  activeTextColor: string
  contentType: string
  inActiveTextColor: string
  active?: boolean
  onPress?(): void
}

function renderTextTab(color, text) {
  return (
    <TabText color={color}>{text.toUpperCase()}</TabText>
  )
}

function renderIconTab(color, text) {
  return (
    <Icon name={text} style={{color: color}}/>
  )
}

const Tab: React.SFC<TabProps> = ({activeTextColor, active, onPress, text, inActiveTextColor, tabWidth, stretch, contentType}) => {
  const color = active ? activeTextColor : inActiveTextColor

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>

        {(contentType === 'text') ? this.renderTextTab(color, text) : this.renderIconTab(color, text)}
      </TabBody>
    </TabButton>
  )
}

export default Tab
