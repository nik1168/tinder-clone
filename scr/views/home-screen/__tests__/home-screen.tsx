import HomeScreen from "../index";
import React from 'react';
import {render} from "@testing-library/react-native";

describe('Home Screen', (): void => {

    test('should render', async (): Promise<void> => {
        const component = render(
            <HomeScreen/>
        );

        expect(component.getByText('I am the home screen')).toBeTruthy();
    });

});
