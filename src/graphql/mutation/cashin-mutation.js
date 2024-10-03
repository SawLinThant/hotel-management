import { gql } from "@apollo/client";

export const CREATE_CASHIN_AMOUNT = gql`
  mutation createCashinAmount(
    $amount: numeric
    $hotel_group: String
  ) {
    insert_cashin_amounts_one(
      object: {
        amount: $amount
        hotel_group: $hotel_group
      }
    ) {
      id
      amount
      created_at
      updated_at
      hotel_group
    }
  }
`;

export const UPDATE_CASHIN_AMOUNT_BY_ID = gql`
  mutation updateCashinAmountById(
    $id: uuid!
    $amount: numeric
    $hotel_group: String
  ) {
    update_cashin_amounts_by_pk(
      pk_columns: { id: $id },
      _set: {
        amount: $amount
        hotel_group: $hotel_group
      }
    ) {
      id
      amount
      updated_at
      hotel_group
    }
  }
`;

export const DELETE_CASHIN_AMOUNT_BY_ID = gql`
  mutation deleteCashinAmountById($id: uuid!) {
    delete_cashin_amounts_by_pk(id: $id) {
      id
    }
  }
`;