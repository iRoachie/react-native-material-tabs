// Type definitions for react-native-material-tabs
// Project: https://github.com/iRoachie/react-native-material-tabs
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.2.2

import React from 'react'

interface TabsProps {
  /**
   * The index of current tab selected. Indexes are mapped to the items prop
   *
   * Default is 0
   */
  selectedIndex?: number

  /**
   * Color of the tab bar
   *
   * Default is #13897b
   */
  barColor?: string

  /**
   * Color of the text for the selected tab
   *
   * Default is #fff
   */
  activeTextColor?: string

  /**
   * Color of the indicator
   *
   * Default is #fff
   */
  indicatorColor?: string

  /**
   * Color of the text for inactive tabs
   *
   * Default is rgba(255, 255, 255, 0.7)
   */
  inactiveTextColor?: string

  /**
   * Option between having fixed tabs or scrollable tabs
   *
   * Default is false
   */
  scrollable?: boolean

  /**
   * The titles for the individual tabs
   */
  items: string[]

  /**
   * Handler that's emitted every time the user presses a tab.
   * You can use this to change the selected index
   * @param index
   */
  onChange(index: number): void
}

export default class MaterialTabs extends React.Component<TabsProps, null> { }
