import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { ADMINS } from '../shared/admins';
import { COMMENTS } from '../shared/comments';

function RenderAdmin(props) {

  const {admin} = props;

  if (admin) {
    return (
      <Card
        featuredTitle={admin.name}
        image={require('./images/stephanie.jpg')}>
        <Text style={{ margin: 10 }}>
          {admin.description}
        </Text>
        <View
          style={{display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between'}}>
          <Icon
            name='heart-o'
            type='font-awesome'
            color='#f50'
            raised
            reverse
            onPress={() => props.favorite ? 
              console.log("Already set as a favorite admin") : props.markFavorite()}
          />
          <Icon
            containerStyle={{paddingRight: 8,
              alignSelf: 'flex-end',
            }}
            name={props.message ? 'envelope' : 'envelope-o'}          
            type='font-awesome'
            color='#0000FF'
            raised
            reverse
            onPress={() => props.message()}
          />
        </View>
      </Card>
    );
  }
  return <View />;
}

function RenderComments({comments}) {

  const renderCommentItem = ({item}) => {
      return(
          <View style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.text}</Text>
              <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
              <Text style={{fontSize: 12}}>{` -- ${item.author}, ${item.date}`}</Text>
          </View>
      )
  };
  return(
      <Card title='Reviews'>
          <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
          />
      </Card>
  )
}

class AdminInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admins: ADMINS,
      comments: COMMENTS,
      favorite: false,
  };
}

markFavorite() {
this.setState({favorite: true});
}

message() {
  Linking.openURL('mailto:mailto@dealsandcodescommunity@gmail.com');  }

  static navigationOptions = {
    title: 'Admin Information'
};

  render() {
    const adminId = this.props.navigation.getParam('adminId');
    const admin = this.state.admins.filter(admin => admin.id === adminId)[0];
    const comments = this.state.comments.filter(comment => comment.adminId === adminId);
    return (
    <ScrollView>
      <RenderAdmin 
        admin={admin}
        favorite={this.state.favorite}
        markFavorite={() => this.markFavorite()}
        message={() => this.message()}
      />
      <RenderComments comments={comments} />
    </ScrollView>
    );
  }
}

export default AdminInfo;