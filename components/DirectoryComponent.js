import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

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
        data={this.props.admins.admins}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

}
export default connect(mapStateToProps)(Directory);