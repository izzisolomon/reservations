# Reservations

## Mobile Tech Stack

- Node 8.15.1
- React Native 0.59.5
- TypeScript
- ApolloClient

## Main React Native Dependencies

- React Navigation v3
- React Native Elements
- React Native Vector Icons (required by RN Elements)

## Getting up and running

- `git clone ...` - Clone the repository
- `yarn` - install the node dependencies

## Project Structure

```
|-- src
  |-- components - Custom components used throught the project.
  |-- screens - Main screen, reservation details screen, and new reservation screen.
  |-- data - reservation.ts class that handles BE calls, and a types class for globaly used interfaces
root.ts - main navigator 
```



## Some Comments

Reservations are sorted by arrival date ASC.
I Implemented endless scrolling on the reservations list (it will keep loading more once you scroll to the bottom).
The search bar searches through the 'name' and 'hotelName' fields. 
Adding a new reservation is done using the top right button on the main page.
You can also modify a Reservation by going to its details page and clicking "modify".
I did not do any format restrictions on the date input fields (Arrival / Departure Date) but ideally those should only accept date strings.


