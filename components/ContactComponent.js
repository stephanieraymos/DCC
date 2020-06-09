import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native';
import { ADMINS } from '../shared/admins';
import { Card } from 'react-native-elements';
import { RenderAdmin } from './AdminInfoComponent';
import * as Animatable from 'react-native-animatable';

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
        <Animatable.View animation='fadeInDown' duration={1000} delay={1000}>

          <Card
            title={"Contact Information"}
            wrapperStyle={{ margin: 20 }} >
            <Text
              onPress={() => this.props.admin.email}>
              Email: dealsandcodescommunity@gmail.com
        </Text>
          </Card>
        </Animatable.View>

      </ScrollView>
    )
  }
}

export default ContactComponent
