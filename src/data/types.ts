export default interface Reservation {
  name?: string,
  hotelName?: string,
  arrivalDate?: string,
  departureDate?: string,
  id?: number
}

export interface PageInfo {
  hasNextPage?: Boolean,
  hasPreviousPage?: Boolean,
  startCursor?: string,
  endCursor?: string
}


