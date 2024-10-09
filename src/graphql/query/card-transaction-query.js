import { gql } from "@apollo/client";
import { formatISO, subDays, startOfDay } from "date-fns";

const sevenDaysAgo = formatISO(subDays(new Date(), 7));
const today = formatISO(startOfDay(new Date()));

export const GET_CARDS_TRANSACTION = gql`
  query getCardTransaction {
    card_transactions (order_by: { created_at: desc }){
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card{
       id
       card_number
       customer{
          id
          name
        }
      }
       terminal{
        terminal_number
      }
    }
  }
`;

export const GET_CARDS_TRANSACTION_BY_HOTEL_GROUP = gql`
  query getCardTransaction($hotelGroup: String!) {
    card_transactions(
      where: { card: { hotel_group: { _eq: $hotelGroup } } }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        id
        card_number
        hotel_group
        customer {
          id
          name
        }
      }
      terminal {
        terminal_number
      }
    }
  }
`;

export const GET_CARDS_TRANSACTION_BY_ID = gql`
   query getCardTransactionById($id: uuid!) {
    card_transactions(where: { id: { _eq: $id } }) {
    id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card{
        card_number
        customer{
          id
          name
        }
      }
      cardTransactionTypeByCardTransactionType{
        name
      }
      terminal{
        terminal_number
      }
    }
  }
`
export const GET_CARDS_TRANSACTION_SEVENDAYS = gql`
  query getCardTransaction {
    card_transactions(
      where: { created_at: { _gte: "${sevenDaysAgo}" } }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
       card{
        id
        card_number
        customer{
          id
          name
          hotel_group
        }
      }
    }
  }
`;

export const GET_CARDS_TRANSACTION_BY_TYPE = gql`
  query getCardTransactionByType($transactionType: String!) {
    card_transactions(
      where: { card_transaction_type: { _eq: $transactionType } }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        id
        card_number
        customer{
          id
          name
        }
      }
        terminal{
        terminal_number
      }
    }
  }
`;

export const GET_CARDS_TRANSACTION_BY_TYPE_AND_HOTEL_GROUP = gql`
  query getCardTransactionByTypeAndHotelGroup($transactionType: String!, $hotel_group: String!) {
    card_transactions(
      where: {
        card_transaction_type: { _eq: $transactionType },
        card: { hotel_group: { _eq: $hotel_group } }
      }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        id
        card_number
        hotel_group
        customer {
          id
          name
        }
      }
      terminal {
        terminal_number
      }
    }
  }
`;


export const GET_CARDS_TRANSACTION_BY_CARD_NUMBER = gql`
  query getCardTransactionByCardNumber($card_number: String!) {
    card_transactions(where: { card: { card_number: { _eq: $card_number } } }) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        card_number
        customer{
          id
          name
        }
      }
      cardTransactionTypeByCardTransactionType {
        name
      }
      terminal {
        terminal_number
      }
    }
  }
`;

export const GET_CARDS_TRANSACTION_BY_CARD_NUMBER_BY_HOTEL_GROUP = gql`
  query getCardTransactionByCardNumber($card_number: String!, $hotel_group: String!) {
    card_transactions(
      where: { 
        card: { 
          card_number: { _eq: $card_number }, 
          hotel_group: { _eq: $hotel_group } 
        } 
      }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        card_number
        hotel_group
        customer {
          id
          name
        }
      }
      cardTransactionTypeByCardTransactionType {
        name
      }
      terminal {
        terminal_number
      }
    }
  }
`;


export const GET_CARDS_TRANSACTION_TODAY = gql`
  query getCardTransactionToday($hotelGroup: String!) {
    card_transactions(
      where: {
        created_at: { _gte: "${today}" },
        card: { customer: { hotel_group: { _eq: $hotelGroup } } }
      }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        id
        card_number
        customer {
          id
          name
          hotel_group
        }
      }
      terminal {
        terminal_number
      }
    }
  }
`;


export const GET_CARDS_TRANSACTION_TODAY_BY_TYPE = gql`
  query getCardTransactionTodayByType($transactionType: String!, $hotelGroup: String!) {
    card_transactions(
      where: {
        created_at: { _gte: "${today}" },
        card_transaction_type: { _eq: $transactionType },
        card: { customer: { hotel_group: { _eq: $hotelGroup } } }
      }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        id
        card_number
        customer {
          id
          name
          hotel_group
        }
      }
      terminal {
        terminal_number
      }
    }
  }
`;


export const GET_CARDS_TRANSACTION_TODAY_BY_CARD_NUMBER = gql`
  query getCardTransactionTodayByCardNumber($cardNumber: String!, $hotelGroup: String!) {
    card_transactions(
      where: {
        created_at: { _gte: "${today}" },
        card: {
          card_number: { _eq: $cardNumber },
          customer: { hotel_group: { _eq: $hotelGroup } }
        }
      }
      order_by: { created_at: desc }
    ) {
      id
      transaction_number
      amount
      terminal_id
      card_id
      card_transaction_type
      created_at
      updated_at
      card {
        id
        card_number
        customer {
          id
          name
          hotel_group
        }
      }
      terminal {
        terminal_number
      }
    }
  }
`;
