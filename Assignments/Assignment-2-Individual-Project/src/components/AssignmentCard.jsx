
function AssignmentCard({ assignment, onToggle }) {
  return (
    <article
      className={`assignment-card ${
        assignment.completed ? "completed" : ""
      }`}
    >
      <h3>{assignment.title}</h3>
      <p>Subject: {assignment.subject}</p>
      <p>Deadline: {assignment.deadline}</p>
      <p>
        Status: {assignment.completed ? "Completed" : "Pending"}
      </p>

      <button onClick={() => onToggle(assignment.id)}>
        {assignment.completed
          ? "Mark as Pending"
          : "Mark as Completed"}
      </button>
    </article>
  );
}

export default AssignmentCard;

