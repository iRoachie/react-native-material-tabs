// @flow

import React from 'react';
import type { Element } from 'react';
import { StyleSheet } from 'react-native';
import { TabButton } from './styles';
import { TabItem } from './TabItem';

export type ContentType = string | Element<*>;

type TabProps = {
  allowFontScaling: boolean,
  content: ContentType,
  tabWidth: number,
  tabHeight: number,
  stretch: boolean,
  activeTextColor: string,
  inActiveTextColor: string,
  active?: boolean,
  textStyle: any,
  uppercase: boolean,
  activeTextStyle: any,
  onPress?: () => void,
};

const Tab = ({
  allowFontScaling,
  activeTextColor,
  active,
  onPress,
  content,
  inActiveTextColor,
  tabWidth,
  tabHeight,
  stretch,
  textStyle,
  uppercase,
  activeTextStyle,
}: TabProps) => {
  const color = active ? activeTextColor : inActiveTextColor;

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody tabHeight={tabHeight}>
        <TabItem
          activeTextStyle={activeTextStyle}
          allowFontScaling={allowFontScaling}
          color={color}
          content={content}
          uppercase={uppercase}
          textStyle={textStyle}
        />
      </TabBody>
    </TabButton>
  );
};

Tab.defaultProps = {
  active: false,
  onPress: () => null,
};

export default Tab;
