import React from 'react';
import { Text } from 'react-native'
import Reservation from '../data/types';
import { Card, Button } from 'react-native-elements';

interface Props {
    reservation: Reservation,
    onPress: () => void
}

const DetailsCard = (props: Props) => {
    const { name, hotelName, arrivalDate, departureDate } = props.reservation;

    return (
        <Card
        title={name || "n/a"}>
        <Text style={{alignSelf: "center", margin: 10 }}>
            {hotelName || "n/a"}
        </Text>
        <Text style={{ padding: 10 }}>{`Arrival: ${arrivalDate || "n/a"}\n\nDeparture: ${departureDate || "n/a"}`}</Text>
        <Button
            onPress={props.onPress}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Modify Reservation' />
        </Card> 
    )
}

export default DetailsCard;