import { gql } from "@apollo/client";

export const GET_TERMINALS = gql`
  query getTerminals {
    terminals(order_by: { terminal_number: asc }) {
      id
      terminal_number
      disabled
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

export const GET_TERMINALS_BY_HOTEL_GROUP = gql`
  query getTerminals($hotelGroup: String!) {
    terminals(
      where:{hotel_group:{_eq:$hotelGroup}}
      order_by: { terminal_number: asc }
    ) {
      id
      terminal_number
      disabled
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

export const GET_TERMINAL_BY_ID = gql`
  query getTerminalsById($id: uuid!) {
    terminals(where: { id: { _eq: $id } }) {
      id
      terminal_number
      password
      facility_id
      disabled
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
export const GET_TERMINAL_BY_STATUS = gql`
  query getTerminalsByStatus($disabled: Boolean!) {
    terminals(where: { disabled: { _eq: $disabled } }) {
      id
      terminal_number
      disabled
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

export const GET_TERMINAL_BY_STATUS_AND_HOTEL_GROUP = gql`
  query getTerminalsByStatus($disabled: Boolean!, $hotelGroup: String!) {
    terminals(
      where: { disabled: { _eq: $disabled }, hotel_group: { _eq: $hotelGroup } }
    ) {
      id
      terminal_number
      disabled
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
