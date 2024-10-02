import { gql } from "@apollo/client";

export const GET_ESTABLISHMENT = gql`
  query getEstablishments {
    establishments {
      id
      name
    }
  }
`;