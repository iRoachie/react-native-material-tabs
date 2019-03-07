// @flow

import React from 'react';
import type { Element } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TabText } from './styles';

export type ContentType = string | Element<*>;

type TabItemProps = {
  activeTextStyle: any,
  allowFontScaling: boolean,
  color: string,
  content: ContentType,
  textStyle: any,
  uppercase: boolean,
};

const TabItem = ({
  activeTextStyle,
  allowFontScaling,
  color,
  content,
  textStyle,
  uppercase
}: TabItemProps) => {
  // Just render the simple text
  if (typeof content === 'string') {
    return (
      <TabText
        color={color}
        style={StyleSheet.flatten([textStyle, activeTextStyle])}
        allowFontScaling={allowFontScaling}
      >
        {uppercase ? content.toUpperCase() : content}
      </TabText>
    );
  }
  // if has a props.type should be icon + label style
  if (content.props.type) {
    return (
      React.cloneElement(content, {
        style: [content.props.style, { color }],
      })
    );
  }
  // return just the icon
  return (
    React.cloneElement(content, {
      style: [content.props.style, { color }],
    })
  );
}

export default TabItem;
