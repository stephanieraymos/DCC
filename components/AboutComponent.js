import React, { Component } from 'react';
import { Text, ScrollView, FlatList, Linking, TouchableOpacity, View } from 'react-native';
import { PARTNERS } from '../shared/partners';
import { Card, ListItem } from 'react-native-elements';

function Mission() {

  return (
    <Card
      title={"Our Mission"}>
      <View style={{ display: "flex", flexDirection: "row", flex: 1, flexWrap: 'wrap', margin: 10 }}>
        <Text>The Deals and Codes Community </Text>
        <TouchableOpacity>
          <Text style={{ color: 'blue' }} onpress={() => Linking.openURL('https://www.facebook.com/groups/dealsandcodescommunity/')} >
          facebook group
          </Text>
        </TouchableOpacity>
        <Text>was created in 2018 by Stephanie Raymos. 
          This community is a place to find amazing deals for many retailers such as Amazon and Walmart.  
          This app was created nearly two years later to create a more user-friendly browsing experience for everyone. 
        </Text>
      </View>
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
