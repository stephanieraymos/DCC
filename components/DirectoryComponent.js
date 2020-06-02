import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      admins: state.admins,
    };
};


class Directory extends Component {


  static navigationOptions = {
    title: 'Directory'
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Tile
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate('AdminInfo', { adminId: item.id })}
          imageSrc={{uri: baseUrl + item.image}}
          />
      );
    };

    return (
      <FlatList
        data={this.props.admins.admins}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

}
export default connect(mapStateToProps)(Directory);