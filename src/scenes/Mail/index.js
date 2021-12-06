import React, { useRef } from 'react'
import { View, Text, BackHandler, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';

import colors from ':global/colors';
import images from ':global/images';
import { WebView } from 'react-native-webview'
import { ActivityIndicator } from 'react-native';
import { scale, scaleByVertical } from ':global/layout';

const mailURL = "https://kftus.com:2096/"

const minimalisticNavigationOptions = {
    headerTintColor: colors.headerTitleTextColor,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerStyle: {
        backgroundColor: colors.headerBackgroundColor,
    },
};

class MailScreen extends React.Component {
    state = {
        isFirst: true,
        canGoBack: false,
        currentURL: mailURL
    }

    static navigationOptions = ({ navigation }) => {
        return {
            ...minimalisticNavigationOptions,
            headerTitle: "Mail",
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

    componentDidMount() {
        this.props.navigation.setParams({ backAction: this.handleBackButtonClick })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    handleBackButtonClick = () => {
        if (this.state.canGoBack) {
            console.log(this.state.currentURL)
            if (this.state.currentURL === mailURL) {
                return true
            } else {
                if (this.webViewRef == null) {
                    this.props.navigation.goBack()
                } else {
                    this.webViewRef.goBack()
                    return true
                }
            }
        } else {
            this.props.navigation.goBack()
            return true
        }
    }

    render() {
        const { links } = this.props
        const { isFirst } = this.state

        var autoLoginScript = `
            setTimeout(() => {
                document.getElementById('login-status').style.display = 'none';
                document.querySelector('.wm').style.display = 'none';
                document.querySelector('#user').value = '` + links["RC_user"] + `';
                document.querySelector('#pass').value = '` + links["RC_pwd"] + `';
                document.getElementById('login_form').submit();
            }, 100);
        `

        return (
            <View style={{ flex: 1 }}>
                <WebView
                    ref={ref => (
                        this.webViewRef = ref
                    )}
                    source={{ uri: mailURL }}
                    injectedJavaScript={isFirst ? autoLoginScript : ""}
                    renderLoading={() => (
                        <ActivityIndicator color='black' size='large' />
                    )}
                    onNavigationStateChange={navState => {
                        if ((navState.url === mailURL)) {
                            if (!isFirst) {
                                this.props.navigation.pop()
                            }
                        } else {
                            console.log(navState.url)
                            this.setState({ canGoBack: navState.canGoBack, currentURL: navState.url, isFirst: false })
                        }
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
)(MailScreen);