import { gql } from '@apollo/client';

export const VERIFY_EMAIL = gql`
  query VerifyEmail($email: EmailAddress!) {
    verifyEmail(email: $email)
  }
`;

export const GET_ALL_WORKSPACES = gql`
  query AllWorkspaces {
    allWorkspaces {
      id
      name
    }
  }
`;

export const GET_TODOS = gql`
  query Todos($status: String, $title: String, $limit: Int, $offset: Int) {
    todos(status: $status, title: $title, limit: $limit, offset: $offset) {
      pagesCount
      todos {
        id
        title
        isCompleted
      }
    }
  }
`;
