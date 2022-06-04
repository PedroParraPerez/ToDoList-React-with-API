import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const ToDoList = () => {
	const [list, setList] = useState([]);
	const [task, setTask] = useState();
	const [validation, setValidation] = useState(true);

	useEffect(() => {
		updateTaskList();
	}, []);

	useEffect(() => {
		saveTaskInAPI();
	}, [list]);

	const updateTaskList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/pedroparra", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setList(data);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

	const saveTaskInAPI = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/pedroparra", {
			method: "PUT",
			body: JSON.stringify(list),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

	const saveTask = () => {
		if (task.trim() !== "") {
			setList([...list, { label: task, done: false }]);
			setTask("");
			setValidation(true);
		} else {
			setValidation(false);
		}
	};

	const Delete = (index) => {
		const newList = list.filter((value, i) => i !== index);
		setList(newList);
	};

	const taskDone = (index) => {
		list[index]["done"] = !list[index]["done"];
		saveTaskInAPI();
		console.log(list[index]);

		return list[index]["done"];
	};
	const printClass = (i) => {
		let taskdone = "tareaa bg-success";
		let taskNoDone = "tareaa";
		if (list[i]["done"] === true) {
			return taskdone;
		} else {
			return taskNoDone;
		}
	};

	return (
		<>
			<div className="wrap">
				<h2 className="title">ToDoList</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<label className="label-task" htmlFor="task"></label>
					<br />
					<input
						className="input-task"
						type="text"
						name="task"
						placeholder="Añadir tarea..."
						value={task}
						onChange={(e) => {
							setTask(e.target.value);
						}}
					/>
					{!validation && (
						<div className="validation">
							{" "}
							<b>Add Task please</b>
						</div>
					)}
					<button
						className="submit"
						onClick={() => {
							saveTask();
						}}>
						Add Task
					</button>
				</form>
				<div className="list-tasks">
					{list.map((task, i) => {
						return (
							<div className={printClass(i)} key={i}>
								<p>{task.label}</p>
								<span
									onClick={() => {
										taskDone(i);
									}}>
									check
								</span>
								<span
									onClick={() => Delete(i)}
									className="delete">
									🗑️
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ToDoList;
