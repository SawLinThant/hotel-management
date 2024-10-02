import { gql } from "@apollo/client";

export const GET_STAFF_ROLE = gql`
  query getStaffRole {
    staff_roles(order_by: { created_at: desc }) {
      id
      name
    }
  }
`;