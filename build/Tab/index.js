import React from 'react'
import { TabText, TabBody, TabButton } from './styles'
function renderTextTab(color, text) {
  return <TabText color={color}>{text.toUpperCase()}</TabText>
}
function renderIconTab(color, text) {
  return <TabText color={color}>{text.toUpperCase()}</TabText>
}
const Tab = ({
  activeTextColor,
  active,
  onPress,
  text,
  inActiveTextColor,
  tabWidth,
  stretch,
  contentType
}) => {
  const color = active ? activeTextColor : inActiveTextColor
  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>

        {contentType === 'text'
          ? this.renderTextTab(color, text)
          : this.renderIconTab(color, text)}
      </TabBody>
    </TabButton>
  )
}
export default Tab
