import { gql } from "@apollo/client";
import { formatISO, subDays, startOfDay } from "date-fns";

const sevenDaysAgo = formatISO(subDays(new Date(), 7));
const today = formatISO(startOfDay(new Date()));

export const GET_CUSTOMERS = gql`
  query getCustomers {
    customers (order_by: { created_at: desc }){
      id
      name
      phone
      email
      created_at
      updated_at
      disabled
      unique_password
    }
  }
`;

export const GET_CUSTOMERS_BY_ID = gql`
   query getCustomersById($id: uuid!) {
    customers(where: { id: { _eq: $id } }) {
      id
      name
      phone
      email
      created_at
      updated_at
      disabled
      unique_password
       cards{
        id
        card_number
        balance
        disabled
      }
    }
  }
`

export const GET_CUSTOMERS_BY_STATUS = gql`
  query getCustomersByStatus($disabled: Boolean!) {
    customers(where: { disabled: { _eq: $disabled } }) {
      id
      name
      phone
      email
      created_at
      updated_at
      disabled
      unique_password
    }
  }
`;

export const GET_CUSTOMERS_CREATED_LAST_SEVEN_DAYS = gql`
  query getCustomer {
    customers(
      where: { created_at: { _gte: "${sevenDaysAgo}" } }
      order_by: { created_at: desc }
    ) {
      id
      name
      phone
      email
      created_at
      updated_at
      disabled
      unique_password
    }
  }
`;

export const GET_CUSTOMERS_CREATED_TODAY = gql`
  query getCustomer {
    customers(
      where: { created_at: { _gte: "${today}" } }
      order_by: { created_at: desc }
    ) {
      id
      name
      phone
      email
      created_at
      updated_at
      disabled
      unique_password
    }
  }
`;
