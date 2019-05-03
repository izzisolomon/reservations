import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Card, Button, Input } from 'react-native-elements'
import reservations from "../data/reservations"
import Reservation from '../data/types';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';

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

    const { name, hotelName, arrivalDate, departureDate, id } = this.state.reservation;
    return (
      <View>
        <Card
            title={id ? "Modify Reservation" : "New Resrvation"}>
            <Input value={name}
            placeholder={"Reservation Name"} onChangeText={(text: String) => this.onChange("name", text)}/>
            <Input value={hotelName}
            placeholder={"Hotel Name"} onChangeText={(text: String) => this.onChange("hotelName", text)}/>
            <Input value={arrivalDate}
            placeholder={"Arrival Date"} onChangeText={(text: String) => this.onChange("arrivalDate", text)}/>
            <Input value={departureDate}
            placeholder={"Departure Date"} onChangeText={(text: String) => this.onChange("DepartureDate", text)}/>
            <Button
            disabled={this.checkDisabled()}
            title={id ? 'Update' : 'Submit'} style={{ marginTop: 15 }} onPress={this.submit}/>
        </Card>
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