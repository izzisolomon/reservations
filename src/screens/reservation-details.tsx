import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { Card, Button } from 'react-native-elements'
import reservations from "../data/reservations"
import Reservation from '../data/types';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';

interface Props {
    navigation: NavigationScreenProp<any, NavigationParams>;
}

interface State {
    reservation: Reservation | null;
}

export default class ReservationDetailsScreen extends Component<Props, State> {
  static navigationOptions: any;
  
  constructor(props: Props) {
      super(props)
  }

  state : State = {
      reservation: null
  }

  componentDidMount() {
   let reservation : Reservation =  this.props.navigation.getParam("reservation", null);
   this.setState({ reservation: reservation });
  }

  render() {
    const { reservation } = this.state;
    if (!reservation) {
        return (
            <View style={styles.container}>
             <ActivityIndicator/>
            </View>
        )
    }

    const { name, hotelName, arrivalDate, departureDate } = reservation;
    return (
      <View>
        <Card
            title={name || "n/a"}>
            <Text style={{alignSelf: "center", margin: 10 }}>
                {hotelName || "n/a"}
            </Text>
            <Text style={{ padding: 10 }}>{`Arrival: ${arrivalDate || "n/a"}\n\nDeparture: ${departureDate || "n/a"}`}</Text>
            <Button
                onPress={()=> this.props.navigation.navigate("NewReservation", { reservation: reservation })}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Modify Reservation' />
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