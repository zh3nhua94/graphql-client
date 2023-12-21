import { gql } from "@apollo/client";

//GET ALL PROJECTS
export const GET_PROJECTS = gql`
	query getProjects {
		projects {
			id
			name
			status
			client {
				id
			}
		}
	}
`;

//GET SINGLE PROJECT
export const GET_PROJECT = gql`
	query getProject($id: ID!) {
		project(id: $id) {
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
