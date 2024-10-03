import { gql } from "@apollo/client";

export const GET_FACILITY_SERIVCES = gql`
  query getFacilityServices {
    facility_services(order_by: { created_at: desc }) {
      id
      name
      price
      facility_id
      created_at
      updated_at
       facility {
        id
        name
      }
    }
  }
`;

export const GET_FACILITY_SERIVCES_BY_HOTEL_GROUP = gql`
  query getFacilityServices($hotelGroup: String!) {
    facility_services(
    where: { hotel_group: { _eq: $hotelGroup } }
    order_by: { created_at: desc }
    ) {
      id
      name
      price
      facility_id
      created_at
      updated_at
      hotel_group
       facility {
        id
        name
      }
    }
  }
`;

export const GET_FACILITY_SERVICE_BY_ID = gql`
  query getFacilityServiceById($id: uuid!) {
    facility_services(where: { id: { _eq: $id } }) {
      id
      name
      price
      facility_id
      created_at
      updated_at
      hotel_group
      facility {
        id
        name
      }
    }
  }
`;