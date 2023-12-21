import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ client }) => {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		// refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		//update cache, setting data in response of deleteClient
		update(cache, { data: { deleteClient } }) {
			//get data from cache (for query GET_CLIENTS) instead of make a new request
			const { clients } = cache.readQuery({ query: GET_CLIENTS });
			const { projects } = cache.readQuery({ query: GET_PROJECTS });

			//write data to cache (for query GET_PROJECTS) to filter out deleted client
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: projects.filter((project) => project.client.id !== deleteClient.id) },
			});
			//write data to cache (for query GET_CLIENTS) to filter out deleted client
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
			});
		},
	});

	return (
		<tr key={client.id}>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button
					onClick={deleteClient}
					className="btn btn-danger btn-sm"
				>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};

export default ClientRow;
