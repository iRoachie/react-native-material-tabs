// @flow

import React from 'react';
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
  activeTabStyle?: StyleObj,
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
  activeTabStyle,
}: TabProps) => {
  const color = active ? activeTextColor : inActiveTextColor;

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody tabHeight={tabHeight} style={activeTabStyle}>
        <TabText
          color={color}
          style={textStyle}
          allowFontScaling={allowFontScaling}
        >
          {uppercase ? text.toUpperCase() : text}
        </TabText>
      </TabBody>
    </TabButton>
  );
};

export default Tab;
