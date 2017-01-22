# React Native Material Tabs

Material Design implementation of Tabs.

<a href="https://www.npmjs.com/package/react-native-material-tabsr"><img src="https://badge.fury.io/js/react-native-material-tabs.svg" alt="" height="18"></a>

## Getting Started
#### Step 1
Install the dependency

```bash
npm i --save react-native-material-tabs
```

Or if you use yarn

```bash
yarn add react-native-materia-tabs
```
#### Step 2
Start using the component.

```jsx
import MaterialTabs from 'react-native-material-tabs';

<MaterialTabs
  items={['One', 'Two', 'Three']}
  selectedIndex={this.state.selectedTab}
  onChange={this.setTab.bind(this)}/>
```
