import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { ADMINS } from '../shared/admins';
import AdminInfo from './AdminInfoComponent';
import { View } from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: ADMINS,
            selectedAdmin: null
        };
    }

    onAdminSelect(adminId) {
        this.setState({selectedAdmin: adminId});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory 
                    admins={this.state.admins} 
                    onPress={adminId => this.onAdminSelect(adminId)} />
                <AdminInfo 
                    admin={this.state.admins.filter(admin => admin.id === this.state.selectedAdmin)[0]}
                />
            </View>
        );
    }
}

export default Main;