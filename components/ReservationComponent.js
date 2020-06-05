import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            returning: false,
            amazon: true,
            date: ''
        };
    }

    static navigationOptions = {
        title: 'Reserve Cooperation'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            returning: false,
            amazon: true,
            date: ''
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Have you worked with us before?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.returning}
                        trackColor={{true: '#980000', false: null}}
                        onValueChange={value => this.setState({returning: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Are you an Amazon seller?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.amazon}
                        trackColor={{true: '#980000', false: null}}
                        onValueChange={value => this.setState({amazon: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Today's date</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Reserve'
                        color='#980000'
                        accessibilityLabel='Tap me to submit a request for cooperation'
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;