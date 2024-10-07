import { gql } from "@apollo/client";

export const GET_HOTEL_GROUP = gql`
  query getHotelGroup {
    hotel_groups (order_by: { created_at: desc }){
      id
      name
      created_at
      updated_at
    }
  }
`;