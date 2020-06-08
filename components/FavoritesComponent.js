import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        admins: state.admins,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'Favorite Admins'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('AdminInfo', {adminId: item.id})}
                />
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

export default connect(mapStateToProps)(Favorites);