import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native';
import { ADMINS } from '../shared/admins';
import { Card } from 'react-native-elements';
import { RenderAdmin } from './AdminInfoComponent';

class ContactComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        admins: ADMINS,
    };
}

static navigationOptions = {
    title: 'Contact Us'
}
  render() {
    <RenderAdmin />
    return (
      <ScrollView>
        <Card  
        title={"Contact Information"}
        wrapperStyle={{margin: 20}} >
        <Text
        onPress={() => this.props.admin.email}>
        Email: dealsandcodescommunity@gmail.com
        </Text>
        </Card>
      </ScrollView>
    )
  }
}

export default ContactComponent
