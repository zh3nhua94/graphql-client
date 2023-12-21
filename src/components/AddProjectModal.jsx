import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";

const AddProjectModal = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [clientID, setClientID] = useState("");
	const [status, setStatus] = useState("Not Started");

	//GET clients for select
	const { loading, error, data } = useQuery(GET_CLIENTS);

	//ADD project mutation
	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, status, clientID },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		//check if empty
		if (!name || !description || !status || !clientID) return alert("Please fill in all fields");
		//add client
		addProject(name, description, status, clientID);
		setName("");
		setDescription("");
		setStatus("Not Started");
		setClientID("");
		document.getElementById("closeAddProjectModal").click();
	};

	if (loading) return null;
	if (error) return "Something went wrong!";

	return (
		<>
			{!loading && !error && (
				<>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#addProjectModal"
					>
						<div className="d-flex align-items-center">
							<FaList className="icon" />
							<div className="text-left ms-3">
								<h6 className="mb-0">New Project</h6>
							</div>
						</div>
					</button>

					<div
						className="modal fade"
						id="addProjectModal"
						aria-labelledby="addProjectModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1
										className="modal-title fs-5"
										id="addProjectModalLabel"
									>
										New Project
									</h1>
									<button
										type="button"
										id="closeAddProjectModal"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">
									<form
										id="addProjectForm"
										onSubmit={handleSubmit}
									>
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
												{data.clients.map((client) => (
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
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AddProjectModal;
