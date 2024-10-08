import { gql } from "@apollo/client";

export const CREATE_TERMINAL = gql`
  mutation createTerminal(
    $terminal_number: String
    $password: String
    $facility_id: uuid
    $hotel_group: String
  ) {
    insert_terminals_one(
      object: {
        terminal_number: $terminal_number
        password: $password
        facility_id: $facility_id
        hotel_group: $hotel_group
      }
    ) {
      id
      terminal_number
      facility_id
      created_at
      updated_at
      hotel_group
    }
  }
`;

export const UPDATE_TERMINAL_BY_ID = gql`
  mutation updateTerminalById(
    $id: uuid!
    $terminal_number: String
    $password: String
    $facility_id: uuid
    $disabled: Boolean
    $hotel_group: String
  ) {
    update_terminals_by_pk(
      pk_columns: { id: $id }
      _set: {
        terminal_number: $terminal_number
        password: $password
        facility_id: $facility_id
        disabled: $disabled
        hotel_group: $hotel_group
      }
    ) {
      id
      terminal_number
      facility_id
      disabled
      created_at
      updated_at
      hotel_group
    }
  }
`;
