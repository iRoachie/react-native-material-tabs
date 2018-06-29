import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface TabsProps {
  /**
   * Specifies whether fonts should scale to respect Text Size accessibility settings
   *
   * Default is true
   */
  allowFontScaling?: boolean;

  /**
   * The index of current tab selected. Indexes are mapped to the items prop
   *
   * Default is 0
   */
  selectedIndex?: number;

  /**
   * Color of the tab bar
   *
   * Default is #13897b
   */
  barColor?: string;

  /**
   * Height of the tab bar
   *
   * Default is 48
   */
  barHeight?: number;

  /**
   * Color of the text for the selected tab
   *
   * Default is #fff
   */
  activeTextColor?: string;

  /**
   * Color of the indicator
   *
   * Default is #fff
   */
  indicatorColor?: string;

  /**
   * Color of the text for inactive tabs
   *
   * Default is rgba(255, 255, 255, 0.7)
   */
  inactiveTextColor?: string;

  /**
   * Option between having fixed tabs or scrollable tabs
   *
   * Default is false
   */
  scrollable?: boolean;

  /**
   * The titles for the individual tabs
   */
  items: string[];

  /**
   * Optional text style to pass to tab titles
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Make the titles uppercased
   *
   * Default is true
   */
  uppercase?: boolean;

  /**
   * Optional text style fot selected tab
   */
  activeTextStyle?: StyleProp<TextStyle>;

  /**
   * Handler that's emitted every time the user presses a tab.
   * You can use this to change the selected index
   * @param index
   */
  onChange(index: number): void;
}

export default class MaterialTabs extends React.Component<TabsProps, null> {}
