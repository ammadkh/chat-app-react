import { gql } from "@apollo/client";

export const MSG_ADDED = gql`
  subscription Subscription {
    messageAdded {
      id
      text
      senderId
      receiverId
      createdAt
    }
  }
`;
