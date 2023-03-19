import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const URL = "http://localhost/Shoppinglist/";

function App() {
	const [items, setItems] = useState([]);
	const [item, setItem] = useState("");
	const [amount, setAmount] = useState();

	useEffect(() => {
		axios
			.get(URL + "shoppinglist.php")
			.then((response) => {
				setItems(response.data);
			})
			.catch((error) => {
				console.log(error.response ? error.response.data.error : error);
			});
	}, []);

	function save(e) {
		e.preventDefault();
		const json =
			/*JSON.stringify({ description: item, amount: amount });*/
			{ description: item, amount: amount };
		axios
			.post(URL + "add.php", json, {
				headers: {
					"Content-Type": "application/json",
				},
			})

			.then((response) => {
				setItems((items) => [...items, response.data]);
			})
			.catch((error) => {
				alert(error.response.data.error);
			});
	}

	function remove(id) {
		const json = JSON.stringify({ id: id });
		axios
			.post(URL + "delete.php", json, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const newListWithoutRemoved = items.filter(
					(item) => item.id !== id
				);
				setItems(newListWithoutRemoved);
			})
			.catch((error) => {
				alert(error.response ? error.response.data : error);
			});
	}

	return (
		<div className="container">
			<h3>Shoppinglist</h3>
			<form onSubmit={save}>
				<label></label>
				<input
					value={item}
					placeholder="Type item"
					onChange={(e) => setItem(e.target.value)}
				></input>
				<label></label>
				<input
					value={amount}
					placeholder="Type amount"
					onChange={(e) => setAmount(e.target.value)}
				></input>
				<button onClick={save}>Save</button>
			</form>
			<ol>
				{items?.map((item) => (
					<li key={item.id}>
						{item.description}&nbsp;
						{item.amount}&nbsp;
						<a
							href="#"
							className="delete"
							onClick={() => remove(item.id)}
						>
							Delete
						</a>
					</li>
				))}
			</ol>
		</div>
	);
}

export default App;
