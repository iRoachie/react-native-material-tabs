import * as React from 'react'
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
  inActiveTextColor: string
  active?: boolean
  onPress?(): void
}

const Tab: React.SFC<TabProps> = ({activeTextColor, active, onPress, text, inActiveTextColor, tabWidth, stretch}) => {
  const color = active ? activeTextColor : inActiveTextColor

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>
        <TabText color={color}>{text.toUpperCase()}</TabText>
      </TabBody>
    </TabButton>
  )
}

export default Tab
