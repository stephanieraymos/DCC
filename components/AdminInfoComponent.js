import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderAdmin({admin}) {   
    if (admin) {
        return (
            <Card
                featuredTitle={admin.name}
                image={require('./images/stephanie.jpg')}>
                <Text style={{margin: 10}}>
                    {admin.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

function AdminInfo(props) {
    return <RenderAdmin admin={props.admin} />;
}

export default AdminInfo;