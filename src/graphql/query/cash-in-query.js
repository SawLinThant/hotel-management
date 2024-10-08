import { gql } from "@apollo/client";

export const GET_CASHIN_AMOUNT = gql`
  query getCashinAmount {
    cashin_amounts(order_by: { created_at: desc }) {
      id
      amount
      created_at
      updated_at
    }
  }
`;

export const GET_CASHIN_AMOUNT_BY_HOTEL_GROUP = gql`
  query getCashinAmount($hotelGroup: String!) {
    cashin_amounts(
      where: { hotel_group: { _eq: $hotelGroup } }
      order_by: { created_at: desc }
    ) {
      id
      amount
      created_at
      updated_at
      hotel_group
    }
  }
`;

export const GET_CASHIN_AMOUNT_BY_ID = gql`
  query getCashinAmount($id: uuid!) {
    cashin_amounts(where: { id: { _eq: $id } }) {
      id
      amount
      created_at
      updated_at
      hotel_group
    }
  }
`;
