import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
  mutation createCard(
    $card_number: String
    $card_password: String
  ) {
    insert_cards_one(
      object: {
        card_number: $card_number
        card_password: $card_password
      }
    ) {
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
    }
  }
`;

export const CARD_REGISTER = gql`
  mutation cardRegister(
    $card_number: String!
    $card_password: String!
    $customer_id: uuid!
  ) {
    cardRegister(
      card_number: $card_number
      card_password: $card_password
      customer_id: $customer_id
    ) {
      message
    }
  }
`;


export const UPDATE_CARD_BY_ID = gql`
  mutation updateCardById(
    $id: uuid!
    $card_number: String
    $card_password: String
    $balance: numeric
    $disabled: Boolean
  ) {
    update_cards_by_pk(
      pk_columns: { id: $id },
      _set: {
        card_number: $card_number,
        card_password: $card_password,
        balance: $balance,
        disabled: $disabled
      }
    ) {
      id
      card_number
      card_password
      balance
      disabled
      updated_at
    }
  }
`;
