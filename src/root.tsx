import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation"; 
import reservationsScreen from "./screens/reservations-list"
import ReservationDetailsScreen from "./screens/reservation-details";
import NewReservationScreen from "./screens/new-reservation";


const Navigator = createStackNavigator({
    Home: { screen: reservationsScreen, navigationOptions: {
        title: "Reservations"
        }
    },
    ReservationDetails: { screen: ReservationDetailsScreen },
    NewReservation: { screen: NewReservationScreen, navigationOptions: NewReservationScreen.navigationOptions }
});

export default createAppContainer(Navigator);