import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
import AdminInfo from './AdminInfoComponent';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { icon, Icon } from 'react-native-elements';


const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
  );

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
  );

const DirectoryNavigator = createStackNavigator(
    {
      Directory: { 
          screen: Directory,
          navigationOptions: ({navigation}) => ({
            headerLeft: <Icon
                name='list'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
          })
        },
      AdminInfo: { screen: AdminInfo }
    }, 
    {
      initialRouteName: 'Directory',
      navigationOptions: {
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
      Home: { screen: Home }
    },
    {
      navigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff'
            },
            headerLeft: <Icon
            name='list'
            type='font-awesome'
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
        />
        })
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        Contact: { screen: ContactNavigator },
        About: { screen: AboutNavigator }

    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

class Main extends Component {
  render() {
      return (
          <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
              <MainNavigator />
          </View>
      );
  }
}

export default Main;