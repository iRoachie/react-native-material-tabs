// @flow

import React from 'react';
import { TabText, TabBody, TabButton } from './styles';
import type { StyleObj } from '../../lib/definitions';

type TabProps = {
  text: string,
  tabWidth: number,
  stretch: boolean,
  activeTextColor: string,
  inActiveTextColor: string,
  active?: boolean,
  textStyle: StyleObj,
  onPress?: () => void,
};

const Tab = ({
  activeTextColor,
  active,
  onPress,
  text,
  inActiveTextColor,
  tabWidth,
  stretch,
  textStyle,
}: TabProps) => {
  const color = active ? activeTextColor : inActiveTextColor;

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>
        <TabText color={color} style={textStyle}>
          {text.toUpperCase()}
        </TabText>
      </TabBody>
    </TabButton>
  );
};

export default Tab;
