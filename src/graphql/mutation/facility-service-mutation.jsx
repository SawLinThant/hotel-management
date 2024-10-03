import { gql } from "@apollo/client";

export const CREATE_FACILITY_SERVICE = gql`
  mutation createFacilityService(
    $name: String
    $price: numeric
    $facility_id: uuid
    $hotel_group: String
  ) {
    insert_facility_services_one(
      object: { name: $name, price: $price, facility_id: $facility_id,  hotel_group: $hotel_group}
    ) {
      id
      name
      price
      facility_id
      created_at
      updated_at
      hotel_group
    }
  }
`;

export const UPDATE_FACILITY_SERVICE = gql`
  mutation updateFacilityService(
    $id: uuid!
    $name: String
    $price: numeric
    $facility_id: uuid
    $hotel_group: String
  ) {
    update_facility_services_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, price: $price, facility_id: $facility_id, hotel_group: $hotel_group }
    ) {
      id
      name
      price
      facility_id
      created_at
      updated_at
      hotel_group
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