/**
 * RootStack
 */
export enum RootStackRouteNames {
  Home = 'Home',
  Chat = 'Chat',
}
export interface RootStackParams {
  [RootStackRouteNames.Home]: undefined;
  [RootStackRouteNames.Chat]: undefined;
}
