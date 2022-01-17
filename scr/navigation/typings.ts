/**
 * RootStack
 */
export enum RootStackRouteNames {
  Home = 'Home',
  Chat = 'Chat',
  UserInfoModal = 'UserInfoModal',
}
export type RootStackParams = {
  [RootStackRouteNames.Home]: undefined;
  [RootStackRouteNames.Chat]: undefined;
  [RootStackRouteNames.UserInfoModal]: undefined;
};
