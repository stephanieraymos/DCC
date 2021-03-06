import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    admins: state.admins,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = {
  postFavorite: adminId => (postFavorite(adminId)),
  postComment: (adminId, rating, author, text) => (postComment(adminId, rating, author, text))
};

function RenderAdmin(props) {

  const { admin } = props;
  const view = React.createRef();

  const recognizeDrag = ({ dx }) => (dx < -200) ? true : false;
  const recognizeComment = ({ dx }) => (dx > 200) ? true : false;


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current.bounce(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + admin.name + ' to favorites?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => console.log('Cancel Pressed')
            },
            {
              text: 'OK',
              onPress: () => props.favorite ?
                console.log('Already set as a favorite') : props.markFavorite()
            }
          ],
          { cancelable: false }
        );
      } else {
        if (recognizeComment(gestureState)) {
          props.onShowModal();
        }
      }
      return true;
    }
  });

  const shareAdmin = (title, message, url) => {
    Share.share({
      title: title,
      message: `${title}: ${message} ${url}`,
      url: url
    }, {
      dialogTitle: 'Share ' + title
    });
  };

  if (admin) {
    return (
      <Animatable.View
        animation='fadeInDown'
        duration={1000}
        delay={500}
        ref={view}
        {...panResponder.panHandlers}>

        <Card
          featuredTitle={admin.name}
          image={{ uri: baseUrl + admin.image }}>
          <Text style={{ margin: 10 }}>
            {admin.description}
          </Text>
          <View
            style={{
              display: 'flex', flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Icon
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              raised
              reverse
              onPress={() => props.favorite ?
                console.log("Already set as a favorite admin") : props.markFavorite()}
            />
            <Icon
              style={styles.cardItem}
              name='pencil'
              type='font-awesome'
              color='#5637DD'
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
            <Icon
              containerStyle={{
                paddingRight: 8,
                alignSelf: 'flex-end',
              }}
              name={props.message ? 'envelope' : 'envelope-o'}
              type='font-awesome'
              color='#0000FF'
              raised
              reverse
              onPress={() => props.message()}
            />
            <Icon
              name={'share'}
              type='font-awesome'
              color='#5637DD'
              style={styles.cardItem}
              raised
              reverse
              onPress={() => shareAdmin(admin.name, admin.description, baseUrl + admin.image)}
            />
          </View>
        </Card>
      </Animatable.View>

    );
  }
  return <View />;
}

function RenderComments({ comments }) {

  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          readOnly
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
        />

        <Text style={{ fontSize: 12 }}>{` -- ${item.author}, ${item.date}`}</Text>
      </View>
    )
  };
  return (
    <Animatable.View animation='fadeInUp' duration={1000} delay={500}>

      <Card title='Reviews'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>

  )
}

class AdminInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: '',
      text: ''
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(adminId) {
    this.props.postComment(adminId, this.state.rating, this.state.author, this.state.text);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: '',
      text: '',
      showModal: false
    });
  }

  markFavorite(adminId) {
    this.props.postFavorite(adminId);
  }

  message() {
    Linking.openURL('mailto:mailto@dealsandcodescommunity@gmail.com');
  }

  static navigationOptions = {
    title: 'Admin Information'
  };

  render() {
    const adminId = this.props.navigation.getParam('adminId');
    const admin = this.props.admins.admins.filter(admin => admin.id === adminId)[0];
    const comments = this.props.comments.comments.filter(comment => comment.adminId === adminId);
    return (
      <ScrollView>
        <RenderAdmin
          admin={admin}
          favorite={this.props.favorites.includes(adminId)}
          markFavorite={() => this.markFavorite(adminId)}
          onShowModal={() => this.toggleModal()}
          message={() => this.message()}
        />
        <RenderComments comments={comments} />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}>
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={5}
              imageSize={40}
              onFinishRating={rating => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder='Author'
              leftIcon={{
                type: 'font-awesome',
                name: 'user-o'
              }}
              type='font-awesome'
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}

            />
            <Input
              placeholder='Comment'
              leftIcon={{
                type: 'font-awesome',
                name: 'comment-o'
              }}
              type='font-awesome'
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => { this.setState({ text: text }) }}
              value={this.state.text}

            />
            <View style={{ margin: 10 }}>
              <Button
                title='Submit'
                color='#5637DD'
                onPress={() => {
                  this.handleComment(adminId);
                  this.resetForm();
                }} />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color='#808080'
                title='Cancel'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  cardItem: {
    flex: 1,
    margin: 10
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminInfo);