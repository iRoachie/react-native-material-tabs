// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { TabText, TabBody, TabButton } from './styles';
import type { StyleObj } from '../../lib/definitions';

type TabProps = {
  allowFontScaling: boolean,
  text: string,
  tabWidth: number,
  tabHeight: number,
  stretch: boolean,
  activeTextColor: string,
  inActiveTextColor: string,
  active?: boolean,
  textStyle: StyleObj,
  uppercase: boolean,
  selectedTabStyle?: StyleObj,
  selectedTextStyle?: StyleObj,
  onPress?: () => void,
};

const Tab = ({
  allowFontScaling,
  activeTextColor,
  active,
  onPress,
  text,
  inActiveTextColor,
  tabWidth,
  tabHeight,
  stretch,
  textStyle,
  uppercase,
  selectedTabStyle,
  selectedTextStyle,
}: TabProps) => {
  const color = active ? activeTextColor : inActiveTextColor;

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody tabHeight={tabHeight} style={selectedTabStyle}>
        <TabText
          color={color}
          style={StyleSheet.flatten([textStyle, selectedTextStyle])}
          allowFontScaling={allowFontScaling}
        >
          {uppercase ? text.toUpperCase() : text}
        </TabText>
      </TabBody>
    </TabButton>
  );
};

export default Tab;
