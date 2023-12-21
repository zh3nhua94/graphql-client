import { gql } from "@apollo/client";

//DELETE client
export const DELETE_CLIENT = gql`
	mutation deleteClient($id: ID!) {
		deleteClient(id: $id) {
			id
			name
			email
			phone
		}
	}
`;

//CREATE client
export const ADD_CLIENT = gql`
	mutation addClient($name: String!, $email: String!, $phone: String!) {
		addClient(name: $name, email: $email, phone: $phone) {
			id
			name
			email
			phone
		}
	}
`;
