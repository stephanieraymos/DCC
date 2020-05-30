import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native';
import { ADMINS } from '../shared/admins';
import { Card } from 'react-native-elements';

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
    return (
      <ScrollView>
        <Card  
        title={"Contact Information"}
        wrapperStyle={{margin: 20}} >
        <Text>
        Email: dealsandcodescommunity@gmail.com
        </Text>
        </Card>
      </ScrollView>
    )
  }
}

export default ContactComponent
