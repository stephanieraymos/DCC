import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        admins: state.admins,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: campsiteId => (deleteFavorite(campsiteId))
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'Favorite Admins'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({ item }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete ' + item.name + ' as a favorite?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            //Disables the ability to exit the box without selecting an option
                            { cancelable: false }
                        );
                    }
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={1000}>

                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                            onPress={() => navigate('AdminInfo', { adminId: item.id })}
                        />
                    </Animatable.View>

                </Swipeout>
            );
        };

        if (this.props.admins.isLoading) {
            return <Loading />;
        }
        if (this.props.admins.errMess) {
            return (
                <View>
                    <Text>{this.props.admins.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.admins.admins.filter(
                    admin => this.props.favorites.includes(admin.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);