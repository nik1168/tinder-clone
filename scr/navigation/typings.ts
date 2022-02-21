/**
 * RootStack
 */
import {UserMatch} from '../components/organisms/chat-list/typings';
import {User} from '../views/home-screen/typings';

export enum RootStackRouteNames {
  Home = 'Home',
  Chat = 'Chat',
  Messaging = 'Messaging',
  UserInfoModal = 'UserInfoModal',
  UserMatchModal = 'UserMatchModal',
  UserSignUpModal = 'UserSignUpModal',
}
export type RootStackParams = {
  [RootStackRouteNames.Home]: undefined;
  [RootStackRouteNames.Chat]: undefined;
  [RootStackRouteNames.Messaging]: {
    userMatch: UserMatch;
  };
  [RootStackRouteNames.UserInfoModal]: undefined;
  [RootStackRouteNames.UserMatchModal]: {
    loggedInProfile: User;
    swipedUser: User;
  };
  [RootStackRouteNames.UserSignUpModal]: undefined;
};
