import { gql } from '@apollo/client';

const CHECK_SESSION = gql`
  query CheckSession {
    checkSession {
      user {
        id
        email
        name
        provider
        isEmailVerified
        createdAt
        updatedAt
      }
    }
  }
`;

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        name
        provider
        isEmailVerified
        createdAt
        updatedAt
      }
    }
  }
`;

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export { CHECK_SESSION, LOGIN, REGISTER, LOGOUT };