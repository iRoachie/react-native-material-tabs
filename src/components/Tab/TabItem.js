// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { TabText } from './styles';

type TabItemProps = {
  activeTextStyle: any,
  allowFontScaling: boolean,
  color: string,
  content: any,
  textStyle: any,
  uppercase: boolean,
};

// Helper fn to get the text from Element or just string and convert or no to upper case
const getText = (content, uppercase): string => {
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (content.props.text) {
    // eslint-disable-next-line prefer-destructuring
    text = content.props.text;
  }
  return uppercase ? text.toUpperCase() : text;
};

const TabItem = ({
  activeTextStyle,
  allowFontScaling,
  color,
  content,
  textStyle,
  uppercase,
}: TabItemProps) => {
  // Just render the simple text
  const text = (
    <TabText
      color={color}
      style={StyleSheet.flatten([textStyle, activeTextStyle])}
      allowFontScaling={allowFontScaling}
      marginLeft={content.props ? !content.props.vertical : false}
    >
      {getText(content, uppercase)}
    </TabText>
  );
  if (typeof content === 'string') {
    return text;
  }
  const icon = React.cloneElement(content, {
    style: [content.props.style, { color }],
  });
  // if has a props.text should be icon + label style
  if (content.props.text) {
    const alignmentStyle = {
      alignItems: 'center',
      flexDirection: !content.props.vertical ? 'row' : 'column',
      justifyContent: 'center',
    };
    return (
      <View style={alignmentStyle}>
        {icon}
        {text}
      </View>
    );
  }
  // return just the icon
  return icon;
};

export default TabItem;
