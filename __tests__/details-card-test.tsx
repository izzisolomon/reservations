/**
 * @format
 */

import 'react-native';
import React from 'react';
import DetailsCard from '../src/components/reservation-details-card';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Reservation from '../src/data/types';

let testRes: Reservation = {
    name: "test",
    hotelName: "test",
    arrivalDate: "",
    departureDate: ""
}
test('new card renders correctly', () => {
    const tree = renderer.create(<DetailsCard reservation={testRes} onPress={()=> console.log("press")} />).toJSON();
    expect(tree).toMatchSnapshot();
  });