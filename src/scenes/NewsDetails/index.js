import React, { PureComponent, } from 'react';
import { View, Image, Linking, AppState, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WebView } from 'react-native-webview';
import { setNewsReading, } from ':module_news/actionCreators';
import { formatNewsDate, } from ':module_news/utils';
import ActivityIndicator from ':components/ActivityIndicator';

import { LOGO_ICON_BASE64, } from './constants';
import styles from './styles';

class NewsDetails extends PureComponent {
  componentWillMount() {
    AppState.addEventListener( 'change', this._handleAppStateChange );
    this._startNewsReading();
  }

  componentWillUnmount() {
    AppState.removeEventListener( 'change', this._handleAppStateChange );
    this._stopNewsReading();
  }

  _handleAppStateChange = ( newAppState ) => {
    const { _isAppWasInactive = false, } = this;

    const isNowAppActive = newAppState === 'active';

    if ( _isAppWasInactive && isNowAppActive ) {
      console.log('[newsReading][_handleAppStateChange] app is activated');
      this._startNewsReading();
    } else {
      console.log('[newsReading][_handleAppStateChange] app go to inactive..');
      this._stopNewsReading();
    }

    this._isAppWasInactive = !isNowAppActive;
  };

  _startNewsReading = () => {
    if( !this._isNewsReading ) {
      this._isNewsReading = true;
      this._setNewsReadingState();
    }
  };

  _stopNewsReading = () => {
    this._isNewsReading = false;
  };

  _setNewsReadingState = () => {
    const { newsDetails: { id, }, actions: { setNewsReading, }} = this.props;

    if( this._isNewsReading && !this._timerStarted ) {
      this._timerStarted = true;

      setTimeout(() => {
        this._timerStarted = false;

        if( this._isNewsReading ) {
          setNewsReading( id );
          this._setNewsReadingState();
        }

      }, 1000 );

    }
  };



  formatBodyHtml = ( rawIconUri, rawSenderName, rawDate, rawTitle, rawBody ) => {
    return (
      `
        <html>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
            <style type="text/css">
              .container {
                padding-left: 0.5em;
                padding-right: 0.5em;
              }
              .header-icon {
                display: inline-block;
                vertical-align: middle; 
                height: 2em;
                width: 2em;
              }
              .header-text {
                display: inline-block;
                font-size: 0.8em;
                font-family: Roboto, Arial, Helvetica, sans-serif;
                color: rgba(0, 0, 0, 0.54 );
              }
              .title {
                font-weight: bold;
                font-size: 16px;
                font-family: Roboto, Arial, Helvetica, sans-serif;
                color: rgba(0, 0, 0, 0.87);
              }
              .content-container {
                font-size: 1em;
                font-family: Roboto, Arial, Helvetica, sans-serif !important;
                color: rgba(0, 0, 0, 0.54);
              }
              .content-container p {
                font-size: 1em;
                font-family: Roboto, Arial, Helvetica, sans-serif !important;
                color: rgba(0, 0, 0, 0.54);
              }
            </style>
          </head>
          <body>
            <div class="container">
                <div>
                    <img class="header-icon" src="${rawIconUri}"/>
                    <span class="header-text">${rawSenderName}・${rawDate}</span>
                </div>
                <p class="title">${rawTitle}</p>
                <div class="content-container">
                    <p class="main-text">${rawBody}</p>
                </div>
            </div>
          </body>
        </html>
      `
    );
  };

  render() {
    const { newsDetails: { title, body, internal_date: time, } } = this.props;
    console.log("---------", this.props.newsDetails)

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <WebView
            startInLoadingState
            allowUniversalAccessFromFileURLs
            allowFileAccessFromFileURLs
            mixedContentMode="always"
            originWhitelist={[ '*' ]}
            renderLoading={() => (
              <View style={styles.loadingWrapper}>
                <ActivityIndicator/>
              </View>
            )}
            source={{
              html: this.formatBodyHtml( LOGO_ICON_BASE64, 'TKK', formatNewsDate( time ), title, body ),
            }}
            onShouldStartLoadWithRequest={( { url } ) => {
              if( url.includes( 'http' ) && !url.includes( 'localhost' ) ) {
                Linking.canOpenURL( url )
                  .then( ( isSupported ) => {
                    if( isSupported ) Linking.openURL( url );
                    else console.log( 'Can\'t open url: ', url );
                  } )
                  .catch( ( err ) => console.log( err ) );
                return false;
              }
              else return true;
            }}
          />
        </View>
      </View>
    );
  };
}

export default connect(
  ({ news }) => ({
    newsDetails: news.newsDetails,
  }),
  ( dispatch ) => ({
    actions: bindActionCreators({
      setNewsReading,
    }, dispatch),
  })
)( NewsDetails);