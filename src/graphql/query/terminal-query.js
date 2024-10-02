import { gql } from "@apollo/client";

export const GET_TERMINALS = gql`
  query getTerminals {
    terminals (order_by: { terminal_number: asc }){
      id
      terminal_number
      disabled
      created_at
      updated_at
      facility{
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
      facility{
        id
        name
      }
    }
  }
`
export const GET_TERMINAL_BY_STATUS = gql`
  query getTerminalsByStatus($disabled: Boolean!) {
    terminals(where: { disabled: { _eq: $disabled } }) {
      id
      terminal_number
      disabled
      created_at
      updated_at
      facility{
        id
        name
      }
    }
  }
`;