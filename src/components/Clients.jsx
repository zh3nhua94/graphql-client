import React from "react";
import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);

	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong...</p>;

	return (
		<>
			{!loading && !error && (
				<table className="table table-hover mt-3 mb-5">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.clients.map((client) => (
							<ClientRow
								client={client}
								key={client.id}
							/>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Clients;
