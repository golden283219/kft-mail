import React from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux';

import {WebView} from 'react-native-webview'

class SopDocumentScreen extends React.Component{

    state = {
        link: this.props.navigation.getParam("link")
    }

    render(){
        const {link} = this.state

        return(
            <View style={{flex: 1}}>
                <WebView 
                    source={{uri: link }} 
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
  )( SopDocumentScreen);