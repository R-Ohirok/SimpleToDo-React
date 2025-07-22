import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($email: EmailAddress!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      expiresAt
      workspaceId
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($name: String!) {
    createWorkspace(name: $name) {
      accessToken
      expiresAt
      workspaceId
    }
  }
`;

export const JOIN_WORKSPACE = gql`
  mutation JoinWorkspace($workspaceId: Int!) {
    joinWorkspace(workspace_id: $workspaceId) {
      accessToken
      expiresAt
      workspaceId
    }
  }
`;

export const ADD_TODO = gql`
  mutation CreateTodo($id: ID!, $title: String!, $isCompleted: Boolean!) {
    createTodo(id: $id, title: $title, is_completed: $isCompleted) {
      id
      title
      isCompleted
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String, $isCompleted: Boolean) {
    updateTodo(id: $id, title: $title, is_completed: $isCompleted) {
      id
      title
      isCompleted
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const REFRESH_TOKEN = gql`
  query Refresh {
    refresh {
      accessToken
      expiresAt
      workspaceId
    }
  }
`;
