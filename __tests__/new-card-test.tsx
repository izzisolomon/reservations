/**
 * @format
 */

import 'react-native';
import React from 'react';
import NewCard from '../src/components/new-reservation-card';

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
    const tree = renderer.create(<NewCard reservation={testRes} disabled={true} submit={() => console.log("submit")} onChange={()=> console.log("onChange")} />).toJSON();
    expect(tree).toMatchSnapshot();
  });