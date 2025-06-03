import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React from "react";

import {AuthProvider} from "./context/AuthContext";
import Toast from "react-native-toast-message";
import RootNavigator from "./navigation/RootNavigator";
import {useColorScheme} from "react-native";
import {darkTheme, lightTheme} from "./theme";
import {navigationRef} from "./navigation/NavigationRef";

export default function App() {
    const scheme = useColorScheme();
    const MyLightTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            ...lightTheme.colors,
        },
    };

    const MyDarkTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            ...darkTheme.colors,
        },
    };
    return (
      <AuthProvider>
        <NavigationContainer ref={navigationRef} theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </AuthProvider>

  );
}

