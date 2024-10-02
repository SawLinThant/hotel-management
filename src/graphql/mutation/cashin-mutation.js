import { gql } from "@apollo/client";

export const CREATE_CASHIN_AMOUNT = gql`
  mutation createCashinAmount(
    $amount: numeric
  ) {
    insert_cashin_amounts_one(
      object: {
        amount: $amount
      }
    ) {
      id
      amount
      created_at
      updated_at
    }
  }
`;

export const UPDATE_CASHIN_AMOUNT_BY_ID = gql`
  mutation updateCashinAmountById(
    $id: uuid!
    $amount: numeric
  ) {
    update_cashin_amounts_by_pk(
      pk_columns: { id: $id },
      _set: {
        amount: $amount
      }
    ) {
      id
      amount
      updated_at
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