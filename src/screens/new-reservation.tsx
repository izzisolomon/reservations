import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Card, Button, Input } from 'react-native-elements'
import reservations from "../data/reservations"
import Reservation from '../data/types';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import NewCard from '../components/new-reservation-card';

interface Props {
    navigation: NavigationScreenProp<any, NavigationParams>;
}

interface State {
    reservation: Reservation;
}

export default class NewReservationScreen extends Component<Props, State> {
  static navigationOptions: any;
  
  constructor(props: Props) {
      super(props)
  }

  reservation : Reservation | null = null;

  state : State = {
      reservation: {
          name: "",
          hotelName: "",
          arrivalDate: "",
          departureDate: ""
      }
  }

  componentDidMount() {
   let reservation : Reservation =  this.props.navigation.getParam("reservation", this.state.reservation);
   this.setState({ reservation: reservation });
   this.reservation = reservation;
  }

  onChange = (key : string, text: String) => {
    this.setState({ reservation: { ...this.state.reservation, [key]: text}});
  }

  goBack = (newRes : boolean) => {
    Alert.alert("Success", `Reservation ${newRes ? "created" : "Updated"}`);
    this.props.navigation.navigate("Home");
  }

  submit = () => {
    const { reservation } = this.state;
    if (reservation.id) {
        reservations.updateReservation(reservation).then(res => {
            this.goBack(false);
        })
    } else {
        reservations.createReservation(this.state.reservation).then(res => {
           this.goBack(true);
        })
    }   
  }

  checkDisabled = () => {
    const { reservation } = this.state;
    if (this.reservation) return this.reservation == reservation;
    return reservation.name == "" || reservation.hotelName == "";
  }

  render() {
    return (
      <View>
        <NewCard reservation={this.state.reservation} disabled={this.checkDisabled()} onChange={this.onChange} submit={this.submit}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});