/**
 * RootStack
 */
import {User} from '../views/home-screen/typings';

export enum RootStackRouteNames {
  Home = 'Home',
  Chat = 'Chat',
  UserInfoModal = 'UserInfoModal',
  UserMatchModal = 'UserMatchModal',
}
export type RootStackParams = {
  [RootStackRouteNames.Home]: undefined;
  [RootStackRouteNames.Chat]: undefined;
  [RootStackRouteNames.UserInfoModal]: undefined;
  [RootStackRouteNames.UserMatchModal]: {
    loggedInProfile: User;
    swipedUser: User;
  };
};
