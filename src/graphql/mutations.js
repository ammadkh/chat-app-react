import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Signup($newUser: UserInput!) {
    signup(newUser: $newUser) {
      firstName
      lastName
      email
    }
  }
`;

export const LOG_IN = gql`
  mutation Signin($user: signinInput!) {
    signin(user: $user) {
      token
    }
  }
`;

export const CREATE_TEXT = gql`
  mutation CreateMessage($messageDetail: MessageInput!) {
    createMessage(messageDetail: $messageDetail) {
      id
      text
      senderId
      receiverId
      createdAt
    }
  }
`;
