import { gql } from "@apollo/client";

export const GET_FACILITIES = gql`
  query getFacilities {
    facilities(order_by: { created_at: desc }) {
      id
      name
      phone
      email
      created_at
      updated_at
      establishment_id
    }
  }
`;

export const GET_FACILITIES_BY_HOTEL_GROUP = gql`
  query getFacilities($hotelGroup: String!) {
    facilities(
      where: { hotel_group: { _eq: $hotelGroup } }
      order_by: { created_at: desc }
    ) {
      id
      name
      phone
      email
      created_at
      updated_at
      establishment_id
      hotel_group
    }
  }
`;

export const GET_FACILITY_BY_ID = gql`
  query getFacilityById($id: uuid!) {
    facilities(where: { id: { _eq: $id } }) {
      id
      name
      phone
      email
      created_at
      updated_at
      establishment_id
      hotel_group
      establishment {
        id
        name
      }
    }
  }
`;
