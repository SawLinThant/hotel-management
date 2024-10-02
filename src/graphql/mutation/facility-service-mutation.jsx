import { gql } from "@apollo/client";

export const CREATE_FACILITY_SERVICE = gql`
  mutation createFacilityService(
    $name: String
    $price: numeric
    $facility_id: uuid
  ) {
    insert_facility_services_one(
      object: { name: $name, price: $price, facility_id: $facility_id }
    ) {
      id
      name
      price
      facility_id
      created_at
      updated_at
    }
  }
`;

export const UPDATE_FACILITY_SERVICE = gql`
  mutation updateFacilityService(
    $id: uuid!
    $name: String
    $price: numeric
    $facility_id: uuid
  ) {
    update_facility_services_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, price: $price, facility_id: $facility_id }
    ) {
      id
      name
      price
      facility_id
      created_at
      updated_at
    }
  }
`;

export const DELETE_FACILITY_SERVICE = gql`
  mutation deleteFacilityService($id: uuid!) {
    delete_facility_services_by_pk(id: $id) {
      id
      name
      price
      facility_id
    }
  }
`;