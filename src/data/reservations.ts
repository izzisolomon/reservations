import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Reservation from "./types";

const client = new ApolloClient({
  uri: "https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev"
});

class reservations {
    getreservations(endCursor?: String, s?: String) {
        let after = endCursor ? `after: "${endCursor}"` : "";
        let search = s ? `where: { OR: [ { name_contains: "${s}" }, { hotelName_contains: "${s}" }]}` : "";
        return new Promise((resolve, reject) => {
            client
            .query({
                query: gql`
                {
                    reservationsConnection (first: 20 ${after} ${search} orderBy: arrivalDate_ASC){
                        pageInfo {
                          hasNextPage,
                          hasPreviousPage,
                          endCursor
                        }
                        edges {
                          node
                          {
                            name,
                            hotelName,
                            arrivalDate,
                            departureDate,
                            id
                          }
                        }
                      }
                }
                `
            })
            .then(result => resolve({ data: result.data.reservationsConnection.edges, pageInfo: result.data.reservationsConnection.pageInfo})).catch(error => reject(error))
        })
    }

    updateReservation(reservation: Reservation) {
      let data = `{
        name: "${reservation.name}",
        hotelName: "${reservation.hotelName}",
        arrivalDate: "${reservation.arrivalDate}",
        departureDate: "${reservation.departureDate}"
      }`
      return new Promise((resolve, reject) => {
        client.mutate({
          mutation: gql`
          mutation {
              updateReservation(
              data: ${data}
              where: { id: "${reservation.id}"}
            ) {
              id
            }
          }
          `
        }).then(result => resolve({result})).catch(error => {reject(error)})
      })
    }

    createReservation(reservation: Reservation) {
      let data = `{
        name: "${reservation.name}",
        hotelName: "${reservation.hotelName}",
        arrivalDate: "${reservation.arrivalDate}",
        departureDate: "${reservation.departureDate}"
      }`
      return new Promise((resolve, reject) => {
        client.mutate({
          mutation: gql`
          mutation {
              createReservation(
              data: ${data}
            ) {
              id
            }
          }
          `
        }).then(result => resolve({result})).catch(error => {reject(error)})
      })
    }
}

export default new reservations();


