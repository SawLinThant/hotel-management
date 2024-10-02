import { gql } from "@apollo/client";

export const CREATE_STAFF = gql`
  mutation createCard(
    $name: String
    $username: String  
    $password:String
    $role: String
  ) {
    insert_staffs_one(
      object: {
         name: $name
         username: $username  
         password: $password
         role: $role
      }
    ) {
         id
         name
         username 
         password
         created_at
         updated_at
         role
         disabled
    }
  }
`;
