import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const ToDoList = () => {
	const [list, setList] = useState([]);
	const [task, setTask] = useState();

	const HandelSubmit = (e) => {
		//Para cuando el formulario se envie

		e.preventDefault();
		setList([...list, task]);
		setTask("");
	};

	const Delete = (index) => {
		let tmp = list;
		list.splice(index, 1);
		setList([...tmp]);
	};

	return (
		<>
			<div className="wrap">
				<h3>ToDoList</h3>

				<form onSubmit={HandelSubmit}>
					<label htmlFor="task"></label>
					<br />
					<input
						className="input"
						type="text"
						name="task"
						placeholder="Añadir tarea..."
						value={task}
						onChange={(e) => {
							setTask(e.target.value);
						}}
					/>
					<button type="submit">Añadir Tarea</button>
				</form>
				<div className="task_list">
					<ul>
						{list.map((task, i) => (
							<li key={i}>
								{task}
								<span
									onClick={() => Delete(i)}
									className="delete">
									🗑️
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default ToDoList;
