import { gql, useMutation } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation staffLogin($username: String!, $password: String!) {
    staffLogin(username: $username, password: $password) {
      token
      message
    }
  }
`;
