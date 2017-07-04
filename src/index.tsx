import React from 'react'
import { Animated, ScrollView } from 'react-native'
import { Bar } from './styles'
import TabTrack from './TabTrack'
import Tab from './Tab'
import Indicator from './Indicator'

interface TabsDefaultProps {
  selectedIndex: number
  barColor: string
  activeTextColor: string
  indicatorColor: string
  inactiveTextColor: string
  contentType: string
  iconSet: string[] | string
  scrollable: boolean
}

interface TabsProps extends TabsDefaultProps {
  items: string[]
  onChange(index: number): void
}

interface TabsState {
  tabWidth: number
  barWidth: number
  indicatorPosition: Animated.Value
}

export default class MaterialTabs extends React.Component<TabsProps, TabsState> {
  scrollView: ScrollView
  static defaultProps: TabsDefaultProps
  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  constructor(props: TabsProps) {
    super(props)

    this.state = {
      tabWidth: 0,
      barWidth: 0,
      indicatorPosition: new Animated.Value(0)
    }
  }

  shouldComponentUpdate(nextProps: TabsProps) {
    // Prevent scrolling out of bounds
    return nextProps.selectedIndex < nextProps.items.length && nextProps.selectedIndex >= 0
  }

  componentDidUpdate() {
    this.selectTab()
  }

  selectTab() {
    Animated.spring(
      this.state.indicatorPosition,
      {
        toValue: this.getAnimateValues().indicatorPosition,
        tension: 100,
        friction: 10
      }
    ).start()

    this.scrollView.scrollTo({
      x: this.getAnimateValues().scrollPosition
    })
  }

  getAnimateValues(): { scrollPosition: number, indicatorPosition: number } {
    const idx = this.props.selectedIndex
    const scrollValue = !this.props.scrollable ? this.state.tabWidth : this.state.barWidth * 0.4

    // All props for fixed tabs are the same
    if (!this.props.scrollable) {
      return {
        indicatorPosition: idx === 0 ? 0 : idx * scrollValue,
        scrollPosition: 0
      }
    }

    switch (idx) {
      case 0: // First tab
        return {
          indicatorPosition: 0,
          scrollPosition: 0
        }
      case 1: // Second tab
        return {
          indicatorPosition: this.state.barWidth * 0.5 - scrollValue / 4,
          scrollPosition: scrollValue * 0.25
        }
      case this.props.items.length - 1: // Last tab
        return {
          indicatorPosition: scrollValue * (idx - 1) + (this.state.barWidth * 0.5 - scrollValue / 4),
          scrollPosition: (scrollValue * (idx - 2) + (scrollValue * 0.5))
        }
      default: // Any tabs between second and last
        return {
          indicatorPosition: scrollValue * (idx - 1) + (this.state.barWidth * 0.5 - scrollValue / 4),
          scrollPosition: (scrollValue * 0.25) + (scrollValue * (idx - 1))
        }
    }
  }

  getTabWidth(width) {
    if (!this.props.scrollable) {
      this.setState({tabWidth: width / this.props.items.length})
    }
    this.setState({
      barWidth: width
    })
  }

  getIconSet(iconSet, idx) {
    if (typeof(iconSet) === 'string') {
      return iconSet
    } else {
      if (idx < iconSet.length) {
        return iconSet[idx]
      } else {
        return 'Ionicons'
      }
    }
  }

  renderContent() {
    return (
      <Bar
        barColor={this.props.barColor}
        onLayout={(event: any) => this.getTabWidth(event.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal
          ref={(ref: any) => this.scrollView = ref}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={this.props.scrollable}
        >
          <TabTrack>
            {this.props.items.map((item: string, idx: never) => (
              <Tab
                text={item}
                key={idx}
                stretch={!this.props.scrollable}
                onPress={() => this.props.onChange(idx)}
                iconSet={this.getIconSet(this.props.iconSet, idx)}
                contentType={this.props.contentType}
                active={idx === this.props.selectedIndex}
                activeTextColor={this.props.activeTextColor}
                tabWidth={!this.props.scrollable ? this.state.tabWidth : this.state.barWidth * 0.4}
                inActiveTextColor={this.props.inactiveTextColor}
              />
            ))}
          </TabTrack>

          <Indicator
            color={this.props.indicatorColor}
            value={this.state.indicatorPosition}
            tabWidth={!this.props.scrollable ? this.state.tabWidth : this.state.barWidth * 0.4}
          />
        </ScrollView>
      </Bar>
    )
  }

  render() {
    return this.props.items ? this.renderContent() : null
  }
}

MaterialTabs.defaultProps = {
  selectedIndex: 0,
  barColor: '#13897b',
  activeTextColor: '#fff',
  indicatorColor: '#fff',
  inactiveTextColor: 'rgba(255, 255, 255, 0.7)',
  scrollable: false,
  contentType: 'text',
  iconSet: 'Ionicons'
}
