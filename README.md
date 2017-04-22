# React Native Material Tabs

Material Design implementation of [Tabs](https://material.io/guidelines/components/tabs.html#tabs-types-of-tabs).

[![Build Status](https://travis-ci.org/iRoachie/react-native-material-tabs.svg?branch=master)](https://travis-ci.org/iRoachie/react-native-material-tabs)
[![npm version](https://badge.fury.io/js/react-native-material-tabs.svg)](https://badge.fury.io/js/react-native-material-tabs)
[![npm downloads](https://img.shields.io/npm/dt/react-native-material-tabs.svg)](https://www.npmjs.com/package/react-native-material-tabs)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://www.typescriptlang.org)

## Getting Started
#### Step 1
Install the dependency

```bash
npm i --save react-native-material-tabs
```

Or if you use yarn

```bash
yarn add react-native-material-tabs
```
#### Step 2
Start using the component

```jsx
import MaterialTabs from 'react-native-material-tabs';

<MaterialTabs
  items={['One', 'Two', 'Three']}
  selectedIndex={this.state.selectedTab}
  onChange={this.setTab.bind(this)}/>
```


## Available Props
| prop | default | type | description |
| ---- | ---- | ----| ---- |
| barColor | #13897b | string | Color of the tab bar |
| indicatorColor | #fff | string | Color of the indicator |
| activeTextColor | #fff | string | Color of the text for the selected tab |
| inactiveTextColor | rgba(255, 255, 255, 0.7) | string | Color of the text for inactive tabs |
| items | none | array(string) | The headers for the individual tabs |
| selectedIndex | 0 | number | The index of currrent tab selected. Indexes are mapped to the items prop |
| scrollable | false | boolean | Option between having fixed tabs or scrollable tabs
| onChange | none | Function | Handler that's emitted every time the user presses a tab. You can use this to change the selected index  | 


## Example
![Alt Text](http://i.imgur.com/GYuMgMB.gif)

```jsx
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MaterialTabs from 'react-native-material-tabs'

export default class Example extends Component {
  state = {
    selectedTab: 0
  }

  setTab(tab) {
    this.setState({selectedTab: tab})
  }

  render() {
    return (
      <View style={styles.container}>
        <MaterialTabs 
          items={['One', 'Two', 'Three', 'Four', 'Five']}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab.bind(this)}
          barColor="#1fbcd2"
          indicatorColor="#fffe94"
          activeTextColor="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('Example', () => Example);

```
