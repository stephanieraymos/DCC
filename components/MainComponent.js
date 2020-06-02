import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
import AdminInfo from './AdminInfoComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';


const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#980000'
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
                backgroundColor: '#980000'
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
              backgroundColor: '#980000'
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
              backgroundColor: '#980000'
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


const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.jpg')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Deals and Codes Community</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({focused}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#980000' : 'gray'}                    />
                )
            }
        },
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({focused}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#980000' : 'gray'}                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({focused}) => (
                    <Icon
                        name={'info-circle'}
                        type='font-awesome'
                        size={24}
                        color={focused ? '#980000' : 'gray'}
                        
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({focused}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#980000' : 'gray'}                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent
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
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#980000',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        textAlign: 'center',
    },
    drawerImage: {
        margin: 10,
        height: 80,
        width: 100
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default Main;