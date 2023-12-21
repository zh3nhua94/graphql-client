import { gql } from "@apollo/client";

//ADD project
export const ADD_PROJECT = gql`
	mutation addProject($name: String!, $description: String!, $status: String!, $clientID: ID!) {
		addProject(name: $name, description: $description, status: $status, clientId: $clientID) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;

//DELETE project
export const DELETE_PROJECT = gql`
	mutation deleteProject($id: ID!) {
		deleteProject(id: $id) {
			id
			name
		}
	}
`;

//UPDATE project
export const UPDATE_PROJECT = gql`
	mutation updateProject($id: ID!, $name: String!, $description: String!, $status: String!, $clientID: ID!) {
		updateProject(id: $id, name: $name, description: $description, status: $status, clientId: $clientID) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;
