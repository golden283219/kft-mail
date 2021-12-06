import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';

import {openInbox} from 'react-native-email-link';
import Animated from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCoffee,
  faEnvelope,
  faEnvelopeOpenText,
  faInbox,
  faSignOutAlt,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

import {logout} from ':module_auth/actionCreators';
import routeNames from ':global/routeNames';
import {scale, scaleByVertical} from ':global/layout';
import colors from ':global/colors';
import images from ':global/images';

import Loading from ':scenes/Loading';
import SignUp from ':scenes/SignUp';
import Login from ':scenes/Login';
import NewsList from ':scenes/NewsList';
import NewsDetails from ':scenes/NewsDetails';
import Profile from ':scenes/Profile';
import Password from ':scenes/Password';
import Mail from ':scenes/Mail';
import SopDocumentList from ':scenes/SopDocument/sop_list';
import SopDocumentDetail from ':scenes/SopDocument';
import PosListSystem from ':scenes/PosSystem/pos_list';
import PosSystemDetail from ':scenes/PosSystem';

import AppLinks from './DrawerNavigation';

const LogoNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.screenBackgroundColor,
    elevation: 0,
    borderWidth: 0,
  },
  headerTintColor: colors.headerTitleTextColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerTitle: LogoHeaderTitle,
  headerRight: () => <View />,
};

const minimalisticNavigationOptions = {
  headerTintColor: colors.headerTitleTextColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: colors.headerBackgroundColor,
  },
};

export const drawerRouteConfig = {
  [routeNames.loading]: {
    screen: Loading,
    navigationOptions: {
      header: null,
    },
  },
  [routeNames.newsList]: {
    screen: createStackNavigator(
      {
        [routeNames.newsList]: {
          screen: NewsList,
          navigationOptions: props => {
            return {
              ...minimalisticNavigationOptions,
              title: 'KFT Group',
              headerBackTitle: null,
              headerBackTitleVisible: false,
              headerLeft: (
                <TouchableOpacity
                  onPress={() => props.navigation.toggleDrawer()}
                  style={{
                    marginHorizontal: scaleByVertical(10),
                    paddingHorizontal: scaleByVertical(10),
                  }}>
                  <Image
                    style={{
                      height: scaleByVertical(18),
                      width: scaleByVertical(18),
                    }}
                    source={images.iconMenuBlack}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            };
          },
        },
        [routeNames.newsDetails]: {
          screen: NewsDetails,
          navigationOptions: {
            ...minimalisticNavigationOptions,
            title: 'KFT Group',
            headerBackTitle: null,
            headerBackTitleVisible: false,
          },
        },
        [routeNames.mail]: {
          screen: Mail,
        },
        [routeNames.sopDocument]: {
          screen: SopDocumentList,
          navigationOptions: props => {
            return {
              ...minimalisticNavigationOptions,
              title: 'SOP Document',
              headerLeft: (
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{
                    marginHorizontal: scaleByVertical(10),
                    paddingHorizontal: scaleByVertical(10),
                  }}>
                  <Image
                    style={{
                      height: scaleByVertical(14),
                      width: scaleByVertical(14),
                      transform: [{rotate: '180deg'}],
                    }}
                    source={images.iconArrowRightBlack}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            };
          },
        },
        [routeNames.sopDocumentDetail]: {
          screen: SopDocumentDetail,
          navigationOptions: props => {
            return {
              ...minimalisticNavigationOptions,
              title: 'SOP Document',
              headerLeft: (
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{
                    marginHorizontal: scaleByVertical(10),
                    paddingHorizontal: scaleByVertical(10),
                  }}>
                  <Image
                    style={{
                      height: scaleByVertical(14),
                      width: scaleByVertical(14),
                      transform: [{rotate: '180deg'}],
                    }}
                    source={images.iconArrowRightBlack}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            };
          },
        },
        [routeNames.posSystem]: {
          screen: PosListSystem,
        },
        [routeNames.posSystemDetail]: {
          screen: PosSystemDetail,
        },
        [routeNames.profile]: {
          screen: Profile,
          navigationOptions: props => {
            return {
              ...minimalisticNavigationOptions,
              title: 'Profile',
              headerLeft: (
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{
                    marginHorizontal: scaleByVertical(10),
                    paddingHorizontal: scaleByVertical(10),
                  }}>
                  <Image
                    style={{
                      height: scaleByVertical(14),
                      width: scaleByVertical(14),
                      transform: [{rotate: '180deg'}],
                    }}
                    source={images.iconArrowRightBlack}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            };
          },
        },
        [routeNames.password]: {
          screen: Password,
          navigationOptions: props => {
            return {
              ...minimalisticNavigationOptions,
              title: 'Password',
              headerLeft: (
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{
                    marginHorizontal: scaleByVertical(10),
                    paddingHorizontal: scaleByVertical(10),
                  }}>
                  <Image
                    style={{
                      height: scaleByVertical(14),
                      width: scaleByVertical(14),
                      transform: [{rotate: '180deg'}],
                    }}
                    source={images.iconArrowRightBlack}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            };
          },
        },
      },
      {},
    ),
  },
};

export const MenuItem = ({isActive, icon, title, onPress, style}) => {
  const Container = isActive ? View : TouchableOpacity;

  return (
    <View
      style={{
        marginTop: scaleByVertical(8),
        backgroundColor: colors.screenMenuActiveItemBackgroundColor,
      }}>
      <Container
        onPress={onPress}
        style={[
          {
            padding: scaleByVertical(15),
            flexDirection: 'row',
            backgroundColor: colors.screenBackgroundLightColor,
            alignItems: 'center',
          },
          isActive && {
            backgroundColor: colors.screenMenuActiveItemBackgroundColor,
          },
          style,
        ]}>
        <FontAwesomeIcon icon={icon == null ? faCoffee : icon} />
        <Text
          style={{
            marginLeft: scaleByVertical(20),
            fontSize: 15,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </Container>
    </View>
  );
};

const getActiveRouteSet = contentComponentProps => {
  const {activeItemKey, descriptors = {}} = contentComponentProps;
  return descriptors[activeItemKey];
};

const getActiveRouteNameOnPath = (routeSet = {}) => {
  const {state = {}} = routeSet;
  const {index = 0, routes = []} = state;
  return (routes[index] || {}).routeName;
};

export const drawer = createDrawerNavigator(drawerRouteConfig, {
  drawerType: 'front',
  cardStyle: {
    opacity: 1,
  },
  initialRouteName: routeNames.newsList,
  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },

  contentComponent: props => {
    const activeRouteName = getActiveRouteNameOnPath(getActiveRouteSet(props));
    return (
      <SafeAreaProvider>
        <Animated.View style={[, {flex: 1}]}>
          <SafeAreaView
            style={{backgroundColor: colors.mainAppColor}}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View
              style={{
                alignItems: 'center',
                paddingBottom: scaleByVertical(15),
              }}>
              <Image
                source={images.iconLogo}
                style={{
                  height: scaleByVertical(100),
                  width: scaleByVertical(100),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.screenMainTextColor,
                  fontSize: 15,
                }}>
                User Name
              </Text>
              <Text
                style={{
                  marginTop: scaleByVertical(2),
                  color: colors.screenMainTextColor,
                  fontSize: 14,
                }}>
                {props.screenProps.getState().user.email}
              </Text>
            </View>
          </SafeAreaView>
          <ScrollView>
            <MenuItem
              isActive={activeRouteName === routeNames.newsList}
              title="Announcements"
              icon={faEnvelope}
              onPress={() => {}}
            />
            <MenuItem
              isActive={activeRouteName === routeNames.mail}
              title="Email"
              icon={faEnvelopeOpenText}
              onPress={() => {
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
              }}
            />
            <AppLinks
              props={props}
              activeRouteName={activeRouteName}
              routeNames={routeNames}
            />
            <MenuItem
              isActive={
                activeRouteName === routeNames.profile ||
                activeRouteName === routeNames.password
              }
              title="Profile"
              icon={faUserAlt}
              onPress={() => props.navigation.navigate(routeNames.profile)}
            />
            <MenuItem
              title="Sign Out"
              icon={faSignOutAlt}
              onPress={() => props.screenProps.dispatch(logout())}
            />
          </ScrollView>
        </Animated.View>
      </SafeAreaProvider>
    );
  },
});

const routeConfig = {
  [routeNames.loading]: {
    screen: Loading,
    navigationOptions: {
      header: null,
    },
  },
  [routeNames.signUp]: {
    screen: SignUp,
    navigationOptions: {
      ...minimalisticNavigationOptions,
      title: 'Create account',
    },
  },
  [routeNames.login]: {
    screen: Login,
    navigationOptions: {
      ...minimalisticNavigationOptions,
      title: 'Log In',
    },
  },
  [routeNames.newsList]: {
    screen: drawer,
    navigationOptions: {
      ...minimalisticNavigationOptions,
      title: 'KFT Group',
      header: null,
    },
  },
};

export default routeConfig;
