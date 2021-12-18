/**
 * RootStack
 */
export enum RootStackRouteNames {
    Home = 'Home',
    Chat = 'Chat',
}
export type RootStackParams = {
    [RootStackRouteNames.Home]: undefined;
    [RootStackRouteNames.Chat]: undefined;
};
