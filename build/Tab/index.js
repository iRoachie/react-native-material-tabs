import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { TabText, TabBody, TabButton, IconStyle } from './styles'
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
  const renderTextTab = (color, text) => {
    return <TabText color={color}>{text.toUpperCase()}</TabText>
  }
  const renderIconTab = (color, text) => {
    return <Icon name={text} style={[{ color: color }, IconStyle]} />
  }
  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>

        {contentType === 'text'
          ? renderTextTab(color, text)
          : renderIconTab(color, text)}
      </TabBody>
    </TabButton>
  )
}
export default Tab
