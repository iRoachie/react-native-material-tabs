// @flow

import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '../Touchable';

type TabBodyProps = {
  tabHeight: number,
};

export const TabBody = styled.View`
  height: ${(props: TabBodyProps) => props.tabHeight};
  align-items: center;
  justify-content: center;
  padding-horizontal: 12px;
`;

type TabButtonProps = {
  tabWidth: number,
};

export const TabButton = styled(Button)`
  width: ${(props: TabButtonProps) => props.tabWidth};
`;

type TabTextProps = {
  color: string,
};

export const TabText = styled.Text`
  color: ${(props: TabTextProps) => props.color};
  font-weight: ${Platform.OS === 'ios' ? 500 : 400};
  font-family: ${Platform.OS === 'android' ? 'sans-serif-medium' : 'System'};
  font-size: 14;
  text-align: center;
  min-width: 100%;
`;
