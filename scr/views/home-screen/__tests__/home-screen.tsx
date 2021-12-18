import HomeScreen from "../index";
import React from 'react';
import {fireEvent, render} from "@testing-library/react-native";
import navigation from "../../../navigation/__mocks__/navigation";
import MockedNavigator from "../../../navigation/__mocks__";
import {RootStackRouteNames} from "../../../navigation/typings";


describe('Home Screen', (): void => {

    test('should render', async (): Promise<void> => {
        const component = render(
            <MockedNavigator>
                <HomeScreen/>
            </MockedNavigator>
        );

        expect(component.getByText('I am the home screen')).toBeTruthy();
    });

    test('it should navigate to chat screen', async (): Promise<void> => {
        const component = render(
            <MockedNavigator>
                <HomeScreen/>
            </MockedNavigator>
        );
        fireEvent(component.getByText('go to chat screen'),'press')
        expect(navigation.navigate).toHaveBeenCalledWith(RootStackRouteNames.Chat);
    });

});
