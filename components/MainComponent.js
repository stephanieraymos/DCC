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
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: '#fff'
              },
              headerLeft: <Icon
                  name='info-circle'
                  type='font-awesome'
                  iconStyle={styles.stackIcon}
                  onPress={() => navigation.toggleDrawer()}
          />
          })
    }
  );

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
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
                  name='address-card'
                  type='font-awesome'
                  iconStyle={styles.stackIcon}
                  onPress={() => navigation.toggleDrawer()}
          />
          })
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
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
        />
        })
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#CEC8FF',
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

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});
export default Main;