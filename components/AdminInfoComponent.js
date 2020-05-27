import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ADMINS } from '../shared/admins';

function RenderAdmin({ admin }) {
  if (admin) {
    return (
      <Card
        featuredTitle={admin.name}
        image={require('./images/stephanie.jpg')}>
        <Text style={{ margin: 10 }}>
          {admin.description}
        </Text>
      </Card>
    );
  }
  return <View />;
}

class AdminInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admins: ADMINS
    };
  }

  static navigationOptions = {
    title: 'Admin Information'
};

  render() {
    const adminId = this.props.navigation.getParam('adminId');
    const admin = this.state.admins.filter(admin => admin.id === adminId)[0];
    return <RenderAdmin admin={admin} />;
  }
}

export default AdminInfo;