import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { ADMINS } from '../shared/admins';
import { COMMENTS } from '../shared/comments';

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
      comments: COMMENTS
    };
  }

  static navigationOptions = {
    title: 'Admin Information'
};

  render() {
    const adminId = this.props.navigation.getParam('adminId');
    const admin = this.state.admins.filter(admin => admin.id === adminId)[0];
    const comments = this.state.comments.filter(comment => comment.adminId === adminId);
    return (
    <ScrollView>
      <RenderAdmin admin={admin} />
      <RenderComments comments={comments} />
    </ScrollView>
    );
  }
}

export default AdminInfo;