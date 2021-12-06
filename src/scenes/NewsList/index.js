import React, {useEffect} from 'react';
import {View, FlatList, Linking, Platform, NativeModules} from 'react-native';
import {openInbox} from 'react-native-email-link';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  fetchNewsList,
  fetchNextPageNewsList,
  navigateToNewsDetails,
} from ':module_news/actionCreators';

import {fetchLinkInfo, fetchQuickLinkInfo} from ':module_app/actionCreators';

import Refresher from ':components/Refresher';
import NewsItem from './components/NewsItem';
import HeaderItem from './components/HeaderItem';
import styles from './styles';
import routeNames from './../../global/routeNames';

const NewsList = props => {
  const {
    isAppLoading,
    isLoading,
    maxNewsIndex,
    currentNewsIndex,
    newsList,
    email,
    links,
    quickLinks,
    actions: {
      fetchNewsList,
      fetchNextPageNewsList,
      navigateToNewsDetails,
      fetchLinkInfo,
      fetchQuickLinkInfo,
    },
  } = props;

  useEffect(() => {
    fetchQuickLinkInfo(email);
    fetchLinkInfo(email);
  }, []);

  getLinkList = () => {
    if (
      quickLinks.Links == null ||
      quickLinks.Links == undefined ||
      quickLinks.Links.length == 0
    ) {
      return [];
    } else {
      var newLinkList = [];
      newLinkList.push({Label: 'Email', Link: '', Icon: ''});
      for (var i = 0; i < quickLinks.Links.length; i++) {
        if (i > 4) break;
        newLinkList.push(quickLinks.Links[i]);
      }
      return newLinkList;
    }
  };

  onClickedLink = (item, index) => {
    if (index == 0) {
      if (Platform.OS === 'ios') {
        // If webmail
        Linking.openURL('googlegmail://').catch(err => {
          Linking.openURL(
            'https://apps.apple.com/us/app/gmail-email-by-google/id422689480',
          );
        });
      } else {
        openInbox();
      }
    } else {
      // Else pos system link
      props.navigation.navigate(routeNames.posSystemDetail, {
        link: item['Link'],
        title: item['Label'],
        isBackButtonSupport: item['BackButton'],
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          {height: 60, justifyContent: 'center', alignItems: 'center'},
          styles.header,
        ]}>
        <FlatList
          data={getLinkList()}
          horizontal={true}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => (
            <HeaderItem
              data={item}
              index={index}
              onPress={(item, index) => this.onClickedLink(item, index)}
            />
          )}
          style={styles.header}
        />
      </View>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={newsList}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        refreshControl={
          <Refresher
            refreshing={isLoading && !isAppLoading}
            onRefresh={() => fetchNewsList(0)}
          />
        }
        onEndReached={() => {
          if (currentNewsIndex < maxNewsIndex) fetchNextPageNewsList();
        }}
        renderItem={({item}) => (
          <NewsItem
            companyName={'TKK'}
            time={item.internal_date}
            title={item.title}
            brief={item.snippet || item.body || item.title}
            onPress={() => navigateToNewsDetails(item.id)}
          />
        )}
      />
    </View>
  );
};

export default connect(
  ({app, news, user}) => ({
    isAppLoading: app.isLoading,
    isLoading: news.isLoading,
    newsList: news.newsList,
    maxNewsIndex: news.maxNewsIndex,
    currentNewsIndex: news.currentNewsIndex,
    email: user.email,
    links: app.links,
    quickLinks: app.quickLinks,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchNewsList,
        fetchNextPageNewsList,
        navigateToNewsDetails,
        fetchLinkInfo,
        fetchQuickLinkInfo,
      },
      dispatch,
    ),
  }),
)(NewsList);
