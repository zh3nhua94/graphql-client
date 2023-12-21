import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutation";

const EditProjectForm = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState(project.status);
	const [clientID, setClientID] = useState(project.client.id);

	//GET clients for select
	const { loading, error, data } = useQuery(GET_CLIENTS);

	//UPDATE project mutation
	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status, clientID },
		update(cache, { data: { updateProject } }) {
			cache.writeQuery({
				query: GET_PROJECT,
				data: { project: updateProject },
			});
		},
	});

	const handleUpdate = (e) => {
		e.preventDefault();

		if (!name || !description || !status || !clientID) return alert("Please fill in all fields");

		updateProject(name, description, status, clientID);
	};

	return (
		<div className="mt-5">
			<h3>Update Project Details</h3>
			<form onSubmit={handleUpdate}>
				<div className="mb-3">
					<label className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Description</label>
					<textarea
						id="description"
						className="form-control"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Status</label>
					<select
						id="status"
						className="form-select"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="Not Started">Not Started</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>
				</div>

				{/* Client select box */}
				<div className="mb-3">
					<label className="form-label">Client</label>
					<select
						id="client"
						className="form-select"
						value={clientID}
						onChange={(e) => setClientID(e.target.value)}
					>
						<option value="">Select Client</option>
						{data?.clients.map((client) => (
							<option
								key={client.id}
								value={client.id}
							>
								{client.name}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					className="btn btn-primary"
					// data-bs-dismiss="modal"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditProjectForm;
