import React from 'react'

import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'

import {
  TabText,
  TabBody,
  TabButton,
  IconStyle
} from './styles'


interface TabProps {
  text: string
  iconSet: string
  tabWidth: number
  stretch: boolean
  activeTextColor: string
  contentType: string
  inActiveTextColor: string
  active?: boolean
  onPress?(): void
}

const Tab: React.SFC<TabProps> = ({activeTextColor, active, onPress, text, inActiveTextColor, tabWidth, stretch, contentType, iconSet}) => {
  const color = active ? activeTextColor : inActiveTextColor

  const renderTextTab = (color, text) => {
    return (
      <TabText color={color}>{text.toUpperCase()}</TabText>
    )
  }

  const renderIconTab = (color, text, iconSet) => {
    switch (iconSet) {
      case 'Entypo':
        return (<Entypo name={text} style={[{color: color}, IconStyle]}/>)
      case 'EvilIcons':
        return (<Entypo name={text} style={[{color: color}, IconStyle]}/>)
      case 'FontAwesome':
        return (<FontAwesome name={text} style={[{color: color}, IconStyle]}/>)
      case 'Foundation':
        return (<Foundation name={text} style={[{color: color}, IconStyle]}/>)
      case 'Ionicons':
        return (<Ionicons name={text} style={[{color: color}, IconStyle]}/>)
      case 'MaterialCommunityIcons':
        return (<MaterialCommunityIcons name={text} style={[{color: color}, IconStyle]}/>)
      case 'MaterialIcons':
        return (<MaterialIcons name={text} style={[{color: color}, IconStyle]}/>)
      case 'SimpleLineIcons':
        return (<SimpleLineIcons name={text} style={[{color: color}, IconStyle]}/>)
      case 'Zocial':
        return (<Zocial name={text} style={[{color: color}, IconStyle]}/>)
      default:
        return (<Ionicons name={text} style={[{color: color}, IconStyle]}/>)
    }
  }

  const renderTab = (contentType, color, text, iconSet) => {
    switch (contentType) {
      case 'text':
        return renderTextTab(color, text)
      case 'icon':
        return renderIconTab(color, text, iconSet)
      default:
        return renderTextTab(color, text)
    }
  }

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>
        { renderTab(contentType, color, text, iconSet) }
      </TabBody>
    </TabButton>
  )
}

export default Tab
