import React, { Component } from 'react'
import { Text, ScrollView, FlatList } from 'react-native';
import { PARTNERS } from '../shared/partners';
import { Card, ListItem } from 'react-native-elements';

function Mission () {

  return (
    <Card
    title={"Our Mission"}>
    <Text style={{margin: 10}}>
    We are dedicated to providing amazing deals to help save you tons of money.
    </Text>
    </Card>
  )
}

class AboutComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      partners: PARTNERS
    };
  }

  static navigationOptions = {
    title: 'About Us'
  }
  render() {
  
    
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: require('./images/bootstrap-logo.png') }}
        />
      );
    };

    return (
      <ScrollView>
        <Mission />
        <Card
          title={"Community Partners"}>
          <FlatList
            data={this.state.partners}
            renderItem={renderPartner}
            keyExtractor={item => item.id.toString()} 
            />
        </Card>
      </ScrollView>
    );
  }
}
export default AboutComponent
