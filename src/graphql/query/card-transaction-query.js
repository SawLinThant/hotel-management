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
`

export const GET_CARDS_TRANSACTION_TODAY = gql`
  query getCardTransactionToday {
    card_transactions(
      where: {
        created_at: { _gte: "${today}" }
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
        customer{
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

export const GET_CARDS_TRANSACTION_TODAY_BY_TYPE = gql`
  query getCardTransactionTodayByType($transactionType: String!) {
    card_transactions(
      where: {
        created_at: { _gte: "${today}" }
        card_transaction_type: { _eq: $transactionType }
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
        customer{
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

export const GET_CARDS_TRANSACTION_TODAY_BY_CARD_NUMBER = gql`
  query getCardTransactionTodayByCardNumber($cardNumber: String!) {
    card_transactions(
      where: {
        created_at: { _gte: "${today}" }
        card: { card_number: { _eq: $cardNumber } }
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
        }
      }
      terminal {
        terminal_number
      }
    }
  }
`;