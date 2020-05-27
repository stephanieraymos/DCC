import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ADMINS } from '../shared/admins';


class Directory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admins: ADMINS
    };
  }

  static navigationOptions = {
    title: 'Directory'
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          onPress={() => navigate('AdminInfo', { adminId: item.id })}
          leftAvatar={{ source: require('./images/stephanie.jpg') }}
        />
      );
    };

    return (
      <FlatList
        data={this.state.admins}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

}
export default Directory;