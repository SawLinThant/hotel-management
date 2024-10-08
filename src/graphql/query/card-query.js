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

export const GET_CARDS_BY_HOTEL_GROUP = gql`
  query getCards($hotelGroup: String!) {
    cards (
     where: { hotel_group: { _eq: $hotelGroup } }
    order_by: { created_at: desc }
    ){
      id
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
      hotel_group
      customer{
        id
        name
      }
    }
  }
`;

export const GET_CARDS_BY_CARD_NUMBER = gql`
  query getCards($cardNumber: String!) {
    cards (
     where: { card_number: { _eq: $cardNumber } }
    order_by: { created_at: desc }
    ){
      id
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
      hotel_group
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
      hotel_group
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

export const GET_CARDS_BY_STATUS_AND_HOTEL_GROUP = gql`
  query getCardsByStatus($disabled: Boolean!, $hotel_group: String!) {
    cards(
      where: { 
        disabled: { _eq: $disabled }, 
        hotel_group: { _eq: $hotel_group } 
      }
    ) {
      id
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
      customer {
        id
        name
      }
    }
  }
`;
