
import routeNames from ':global/routeNames';

import Navigator from './Navigator';


const initialState = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams( routeNames.loading )
);

export default ( state = initialState, action ) => {
  return Navigator.router.getStateForAction( action, state ) || state;
};
