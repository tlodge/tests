/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import configureStore from './store/configureStore';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux'
import ButtonView from '../features/buttons/components/ButtonView';
import LoginView from '../features/login/components/LoginView';
import AuthLoadingScreen from '../features/login/components/AuthLoadingScreen';
import QuestionManager from '../features/questions/components/QuestionManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationService from '../utils/navigation/NavigationService';

console.disableYellowBox = true;

const store = configureStore();

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});




type Props = {};
class HomeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to My Modified React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  logout() {
    AsyncStorage.removeItem('sessionToken', () => {
      NavigationService.navigate('Auth', {});
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={this.logout}>Settings!</Text>
      </View>
    );
  }
}

class MessagesScreen extends React.Component {

  logout() {
    AsyncStorage.removeItem('sessionToken', () => {
      NavigationService.navigate('Auth', {});
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={this.logout}>Messages!</Text>
      </View>
    );
  }
}

class RootView extends React.Component {
  render() {
    return <Provider store={store}>
      <TabStack />
    </Provider>
  }
}

class OptionsQuestionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Options Question!</Text>
      </View>
    );
  }
}

class TextQuestionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Text Question!</Text>
      </View>
    );
  }
}

/*const ButtonStack = createStackNavigator(
  {
    Buttons: ButtonView,
    OptionsQuestion: OptionsQuestionScreen,
    TextQuestion: TextQuestionScreen
  },
  {
    initialRouteName: 'Buttons',
  }
)*/

const ButtonStack = createStackNavigator(
  {
    Buttons: ButtonView,
    QuestionNavigator: QuestionManager,
    OptionsQuestion: OptionsQuestionScreen,
    TextQuestion: TextQuestionScreen
  },
  {
    initialRouteName: 'Buttons',
  }
)



const AppStack = createBottomTabNavigator(
  {
    Home: ButtonStack,
    Messages: MessagesScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Messages') {
          iconName = `ios-mail${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: '#000',
      },
      activeTintColor: 'white',
      inactiveTintColor: 'gray',

    },
  }
);

const AuthStack = createStackNavigator(
  {
    SignIn: LoginView,
  }
)
const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <RootStack ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} />
    </Provider>
  }
}