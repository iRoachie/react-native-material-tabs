<h2 align="center">React Native Material Tabs</h2>

<p align="center">Material Design implementation of <a href="https://material.io/guidelines/components/tabs.html#tabs-types-of-tabs">Tabs</a>

<p align="center">
  <a href="https://travis-ci.org/iRoachie/react-native-material-tabs">
    <img alt="Travis" src="https://img.shields.io/travis/iRoachie/react-native-material-tabs.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-native-material-tabs">
    <img alt="npm version" src="https://img.shields.io/npm/v/react-native-material-tabs.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-native-material-tabs">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-native-material-tabs.svg?style=flat-square">
  </a>
   <a href="https://prettier.io">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
   <a href="https://www.styled-components.com">
    <img alt="style: styled-components" src="https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e&style=flat-square">
  </a>
</p>

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
```

## Usage

![Demo](https://user-images.githubusercontent.com/5962998/59991843-f2e43600-9616-11e9-913b-b8fb8a566d68.gif)

```jsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';

const Example = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <MaterialTabs
        items={['One', 'Two', 'Three', 'Four', 'Five']}
        selectedIndex={selectedTab}
        onChange={setSelectedTab}
        barColor="#1fbcd2"
        indicatorColor="#fffe94"
        activeTextColor="white"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Available Props

| prop                      | default                  | type          | description                                                                                                                                                     |
| ------------------------- | ------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| barColor                  | #13897b                  | string        | Color of the tab bar                                                                                                                                            |
| barHeight                 | 48                       | number        | Height of the tab bar                                                                                                                                            |
| indicatorColor            | #fff                     | string        | Color of the indicator                                                                                                                                          |
| indicatorHeight           | 2                        | number        | Height of the indicator
| activeTextColor           | #fff                     | string        | Color of the text for the selected tab                                                                                                                          |
| inactiveTextColor         | rgba(255, 255, 255, 0.7) | string        | Color of the text for inactive tabs                                                                                                                             |
| items                     | none                     | array(string  | element)                                                                                                                                                        | The headers for the individual tabs |
| selectedIndex             | 0                        | number        | The index of current tab selected. Indexes are mapped to the items prop                                                                                         |
| scrollable                | false                    | boolean       | Option between having fixed tabs or scrollable tabs                                                                                                             |
| textStyle                 | null                     | object(style) | Text style for tab titles                                                                                                                                       |
| activeTextStyle           | {}                       | object(style) | Optional text style for the selected tab                                                                                                                        |
| onChange                  | none                     | Function      | Handler that's emitted every time the user presses a tab. You can use this to change the selected index                                                         |
| allowFontScaling          | true                     | boolean       | Specifies whether fonts should scale to respect Text Size accessibility settings                                                                                |
| uppercase                 | true                     | boolean       | Specifies whether to uppercase the tab labels                                                                                                                   |
| keyboardShouldPersistTaps | never                    | string        | Specifies how the [ScrollView](https://facebook.github.io/react-native/docs/scrollview#keyboardshouldpersisttaps) should respond to taps while keyboard is open |
