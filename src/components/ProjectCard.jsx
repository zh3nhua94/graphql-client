import React from "react";

const ProjectCard = ({ project }) => {
	return (
		<div
			key={project.id}
			className="col-md-6 mt-4"
		>
			<div className="card mb-3">
				<div className="card-body">
					<div className="d-flex justify-content-between align-items-center">
						<h5 className="fw-bold">{project.name}</h5>
						<a
							href={`/projects/${project.id}`}
							className="btn btn-secondary"
						>
							View
						</a>
					</div>
					<p>
						<b>Status:</b> {project.status}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
