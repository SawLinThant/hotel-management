import { gql } from "@apollo/client";

export const CREATE_FACILITY = gql`
    mutation createfacility(
      $name:String
      $phone:String
      $email:String
      $establishment_id:uuid
      $hotel_group: String
    ){
        insert_facilities_one(
          object:{
           name: $name
           phone: $phone
           email: $email
           establishment_id:$establishment_id
           hotel_group: $hotel_group
          }
        ){
            name
            phone
            email
            created_at
            updated_at
            establishment_id
            hotel_group
        }
    }
` ;

export const UPDATE_FACILITY_BY_ID = gql`
  mutation updateFacilityById(
    $id: uuid!
    $name: String
    $phone: String
    $email: String
    $establishment_id: uuid
    $hotel_group: String
  ) {
    update_facilities(
      where: { id: { _eq: $id } },
      _set: {
        name: $name
        phone: $phone
        email: $email
        establishment_id: $establishment_id
        hotel_group: $hotel_group
      }
    ) {
      returning {
        id
        name
        phone
        email
        updated_at
        establishment_id
        hotel_group
      }
    }
  }
`;

export const DELETE_FACILITY_BY_ID = gql`
  mutation deleteFacilityById($id: uuid!) {
    delete_facilities(where: { id: { _eq: $id } }) {
      returning {
        id
        name
        phone
        email
        establishment_id
      }
    }
  }
`;