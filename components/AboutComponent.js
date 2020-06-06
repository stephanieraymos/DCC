import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View, TouchableOpacity, Linking } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
      partners: state.partners
    };
};

function Mission() {

  return (
    <Card
      title={"Our Mission"}>
      <View style={{ display: "flex", flexDirection: "row", flex: 1, flexWrap: 'wrap'}}>
        <Text>The Deals and Codes Community </Text>
        <TouchableOpacity>
          <Text 
          style={{ color: 'blue' }} 
          onpress={() => Linking.openURL('https://www.facebook.com/groups/dealsandcodescommunity/')}>
          facebook group</Text>
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

  static navigationOptions = {
    title: 'About Us'
  }
  render() {


    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{source: {uri: baseUrl + item.image}}}
          />
      );
    };


    if(this.props.partners.isLoading) {
      return (
        <ScrollView>
        <Mission />
        <Card
          title={"Partners"}>
          <Loading  />
        </Card>
      </ScrollView>
      )
    }
if (this.props.partners.errMess) {
  return(
    <ScrollView>
    <Mission />
    <Card
      title={"Partners"}>
      <Text>{this.props.partners.errMess}</Text>
    </Card>
  </ScrollView>
  )
}
    return (
      <ScrollView>
        <Mission />
        <Card
          title={"Partners"}>
          <FlatList
            data={this.props.partners.partners}
            renderItem={renderPartner}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(AboutComponent);
