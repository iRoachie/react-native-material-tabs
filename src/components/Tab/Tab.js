// @flow

import React from 'react';
import { TabText, TabBody, TabButton } from './styles';

type TabProps = {
  text: string,
  tabWidth: number,
  stretch: boolean,
  activeTextColor: string,
  inActiveTextColor: string,
  active?: boolean,
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
}: TabProps) => {
  const color = active ? activeTextColor : inActiveTextColor;

  return (
    <TabButton onPress={onPress} tabWidth={tabWidth} stretch={stretch}>
      <TabBody>
        <TabText color={color}>
          {text.toUpperCase()}
        </TabText>
      </TabBody>
    </TabButton>
  );
};

export default Tab;
