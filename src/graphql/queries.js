import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

export const GET_CHAT = gql`
  query MessageByUser($receiverId: ID!) {
    messageByUser(receiverId: $receiverId) {
      id
      text
      senderId
      receiverId
      createdAt
    }
  }
`;
