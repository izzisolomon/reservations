import React from 'react';
import { Text } from 'react-native'
import Reservation from '../data/types';
import { Card, Button, Input } from 'react-native-elements';

interface Props {
    reservation: Reservation,
    onChange: (key: string, text: String) => void,
    disabled: boolean,
    submit: () => void
}

const NewCard = (props: Props) => {
    const { name, hotelName, arrivalDate, departureDate, id } = props.reservation;
    const { disabled, onChange, submit } = props;
    return (
        <Card
            title={id ? "Modify Reservation" : "New Resrvation"}>
            <Input value={name}
            placeholder={"Reservation Name"} onChangeText={(text: String) => onChange("name", text)}/>
            <Input value={hotelName}
            placeholder={"Hotel Name"} onChangeText={(text: String) => onChange("hotelName", text)}/>
            <Input value={arrivalDate}
            placeholder={"Arrival Date"} onChangeText={(text: String) => onChange("arrivalDate", text)}/>
            <Input value={departureDate}
            placeholder={"Departure Date"} onChangeText={(text: String) => onChange("DepartureDate", text)}/>
            <Button
            disabled={disabled}
            title={id ? 'Update' : 'Submit'} style={{ marginTop: 15 }} onPress={submit}/>
        </Card>
    )
}

export default NewCard;