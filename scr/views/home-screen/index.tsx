import React from 'react';
import {Button, Text, View,} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParams, RootStackRouteNames} from "../../navigation/typings";


const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const onPress = ()=>{
        navigation.navigate(RootStackRouteNames.Chat);
    }

    return (
        <View>
            <Text>I am the home screen</Text>
            <Button onPress={onPress} title={'go to chat screen'}/>
        </View>
    );
};

export default HomeScreen;

