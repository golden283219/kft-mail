import React from 'react'
import { View, BackHandler, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';

import colors from ':global/colors';
import images from ':global/images';
import { scale, scaleByVertical } from ':global/layout';

import { WebView } from 'react-native-webview'

const minimalisticNavigationOptions = {
  headerTintColor: colors.headerTitleTextColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: colors.headerBackgroundColor,
  },
};

class PosSystemScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      ...minimalisticNavigationOptions,
      headerTitle: navigation.getParam("title"),
      headerLeft: (
        <TouchableOpacity
          onPress={navigation.getParam('backAction')}
          style={{
            marginHorizontal: scaleByVertical(10),
            paddingHorizontal: scaleByVertical(10),
          }}
        >
          <Image
            style={{
              height: scaleByVertical(14),
              width: scaleByVertical(14),
              transform: [{ rotate: '180deg' }]
            }}
            source={images.iconArrowRightBlack}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    }
  }

  state = {
    canGoBack: false,
    link: this.props.navigation.getParam("link"),
    title: this.props.navigation.getParam("title"),
    isBackButtonSupport: this.props.navigation.getParam("isBackButtonSupport")
  }

  componentDidMount() {
    this.props.navigation.setParams({ backAction: this.handleBackButtonClick })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  handleBackButtonClick = () => {
    if (this.state.isBackButtonSupport) {
      if (this.state.canGoBack) {
        this.webViewRef.goBack()
        return true
      } else {
        this.props.navigation.pop()
        return true
      }
    } else {
      this.props.navigation.pop()
      return true
    }
  }

  render() {
    const { link } = this.state

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={ref => {
            this.webViewRef = ref
          }}
          source={{ uri: link }}
          onNavigationStateChange={navState => {
            this.setState({ canGoBack: navState.canGoBack })
          }}
        />
      </View>
    )
  }
}

export default connect(
  ({ app }) => ({
    isAppLoading: app.isLoading,
    links: app.links,
  })
)(PosSystemScreen);