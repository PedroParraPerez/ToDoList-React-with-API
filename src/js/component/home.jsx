import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const ToDoList = () => {
	const [list, setList] = useState([]);
	const [task, setTask] = useState();

	const createTaskInMyTodoList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/pedroparra",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify([
					{ label: "Make the bed", done: false },
					{ label: "Walk the dog", done: false },
					{ label: "Do the replits", done: false },
					{ label: "realizar la todo list", done: false },
					{ label: "asdadad la todo list", done: false },
					{ label: "asdadad la todo list", done: false },
					{ label: "asdadad la todo list", done: false },
				]),
			}
		);
	};

	const Delete = (index) => {
		let tmp = list;
		list.splice(index, 1);
		setList([...tmp]);
	};

	const HandelSubmit = (e) => {
		//Para cuando el formulario se envie

		e.preventDefault();
		setList([...list, task]);
		setTask("");
		createTaskInMyTodoList();
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
