import { gql } from "@apollo/client";

export const GET_NOTES = gql`
query Query {
  notes {
    id
    title
    body
    createdAt
  }
}
`

export const GET_NOTE = gql`
query Query($id: ID!) {
  note(id: $id) {
    id
    title
    body
    createdAt
  }
}
`