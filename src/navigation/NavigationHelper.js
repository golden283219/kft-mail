import { NavigationActions, StackActions, } from 'react-navigation';

const config = {};

export function setNavigator( nav ) {
  if( nav ) {
    config.navigator = nav;
  }
}

export function navigate( routeName, params ) {
  if( config.navigator && routeName ) {
    config.navigator.dispatch(
      NavigationActions.navigate({ routeName, params, })
    );
  }
}
export function reset( routeName, params ) {
  if( config.navigator && routeName ) {
    config.navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [ NavigationActions.navigate({ routeName: routeName, params, })],
      }),
    );
  }
}

export function goBack() {
  if( config.navigator ) {
    config.navigator.dispatch(
      NavigationActions.back({})
    );
  }
}
