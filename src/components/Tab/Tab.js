// @flow

import React from 'react';
import type { Element } from 'react';
import { StyleSheet } from 'react-native';
import { TabText, TabBody, TabButton } from './styles';
import type { StyleObj } from '../../lib/definitions';

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
  textStyle: StyleObj,
  uppercase: boolean,
  activeTextStyle?: StyleObj,
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
        {typeof content == 'string' ? (
          <TabText
            color={color}
            style={StyleSheet.flatten([textStyle, activeTextStyle])}
            allowFontScaling={allowFontScaling}
          >
            {uppercase ? content.toUpperCase() : content}
          </TabText>
        ) : (
          React.cloneElement(content, {
            style: [content.props.style, { color: color }],
          })
        )}
      </TabBody>
    </TabButton>
  );
};

export default Tab;
