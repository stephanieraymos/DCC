import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native';
import { ADMINS } from '../shared/admins';
import { Card, Button, Icon } from 'react-native-elements';
import { RenderAdmin } from './AdminInfoComponent';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

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

  sendMail() {
    MailComposer.composeAsync({
      recipients: ['dealsandcodescommunity@gmail.com'],
      subject: 'Inquiry',
      body: 'Hello, '
    })
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
            <Button
              title="Send Email"
              buttonStyle={{ backgroundColor: '#980000', margin: 40 }}
              icon={<Icon
                name='envelope-o'
                type='font-awesome'
                color='#fff'
                iconStyle={{ marginRight: 10 }}
              />}
              onPress={() => this.sendMail()}
            />
          </Card>
        </Animatable.View>

      </ScrollView>
    )
  }
}

export default ContactComponent
