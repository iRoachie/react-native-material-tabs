import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { TabText, TabBody, TabButton } from './styles';

export type ContentType = string | React.ReactElement;

interface TabProps {
  allowFontScaling: boolean;
  content: ContentType;
  tabWidth: number;
  tabHeight: number;
  activeTextColor: string;
  inActiveTextColor: string;
  active?: boolean;
  textStyle: StyleProp<TextStyle>;
  uppercase: boolean;
  activeTextStyle?: StyleProp<TextStyle>;
  onPress(): void;
}

const Tab = ({
  allowFontScaling,
  activeTextColor,
  active,
  onPress,
  content,
  inActiveTextColor,
  tabWidth,
  tabHeight,
  textStyle,
  uppercase,
  activeTextStyle,
}: TabProps) => {
  const color = active ? activeTextColor : inActiveTextColor;

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth}>
      <TabBody tabHeight={tabHeight}>
        {typeof content === 'string' ? (
          <TabText
            color={color}
            style={StyleSheet.flatten([textStyle, activeTextStyle])}
            allowFontScaling={allowFontScaling}
          >
            {uppercase ? content.toUpperCase() : content}
          </TabText>
        ) : (
          React.cloneElement(content, {
            style: [content.props.style, { color }],
          })
        )}
      </TabBody>
    </TabButton>
  );
};

Tab.defaultProps = {
  active: false,
};

export default Tab;
