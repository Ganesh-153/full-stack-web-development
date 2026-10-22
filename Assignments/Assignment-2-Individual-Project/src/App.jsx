
import React, { useState } from "react";
import "./style.css";
import assignmentsData from "./data.json";

function App() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("All");

  function addAssignment(event) {
    event.preventDefault();

    if (!title.trim() || !subject.trim() || !deadline) {
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      deadline,
      completed: false
    };

    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setSubject("");
    setDeadline("");
  }

  function toggleAssignment(id) {
    setAssignments(assignments.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ));
  }

  const filteredAssignments = assignments.filter(item => {
    if (filter === "Completed") return item.completed;
    if (filter === "Pending") return !item.completed;
    return true;
  });

  return (
    <main className="container">
      <header>
        <h1>Student Assignment Tracker</h1>
        <p>Organize your studies, one task at a time.</p>
      </header>

      <form onSubmit={addAssignment}>
        <h2>Add an Assignment</h2>

        <label>Assignment Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. HTML Lab Record"
          required
        />

        <label>Subject</label>
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="e.g. Full Stack Development"
          required
        />

        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          required
        />

        <button type="submit">Add Assignment</button>
      </form>

      <section>
        <h2>My Assignments</h2>

        <label>Filter assignments</label>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        {filteredAssignments.map(item => (
          <article
            className={`assignment-card ${item.completed ? "completed" : ""}`}
            key={item.id}
          >
            <h3>{item.title}</h3>
            <p>Subject: {item.subject}</p>
            <p>Deadline: {item.deadline}</p>
            <p>Status: {item.completed ? "Completed" : "Pending"}</p>

            <button onClick={() => toggleAssignment(item.id)}>
              {item.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
          </article>
        ))}

        {filteredAssignments.length === 0 && (
          <p>No assignments found. Add one above!</p>
        )}
      </section>
    </main>
  );
}

export default App;

