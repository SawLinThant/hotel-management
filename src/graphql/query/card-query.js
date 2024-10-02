import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query getCards {
    cards (order_by: { created_at: desc }){
      id
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
      customer{
        id
        name
      }
    }
  }
`;

export const GET_CARDS_BY_ID = gql`
   query getCardsById($id: uuid!) {
    cards(where: { id: { _eq: $id } }) {
      id
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
      customer{
        id
        name
      }
    }
  }
`

export const GET_CARDS_BY_STATUS = gql`
  query getCardsByStatus($disabled: Boolean!) {
    cards(where: { disabled: { _eq: $disabled } }) {
      id
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
      customer{
        id
        name
      }
    }
  }
`;