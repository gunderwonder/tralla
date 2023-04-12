import React, { useState, useEffect } from 'react';
import './App.css';

const items = [
	{ name: 'Blå', price: 49 },
	{ name: 'Gul', price: 35 },
];

function App() {
	const [counts, setCounts] = useState({});

	useEffect(() => {
		const savedCounts = localStorage.getItem('counts');
		if (savedCounts) {
			setCounts(JSON.parse(savedCounts));
		}
	}, []);

	const updateCount = (item, delta) => {
		const newCounts = {
			...counts,
			[item.name]: Math.max((counts[item.name] || 0) + delta, 0),
		};
		setCounts(newCounts);
		localStorage.setItem('counts', JSON.stringify(newCounts));
	};

	const getTotal = () => {
		return items.reduce(
			(total, item) => total + (counts[item.name] || 0) * item.price,
			0
		);
	};

	return (
		<div className="App">
			<h1>Varer jeg skylder</h1>
			<ul>
				{items.map((item) => (
					<li key={item.name}>
						{item.name} ({item.price} kr) - Antall: {counts[item.name] || 0}
						<button onClick={() => updateCount(item, 1)}>+</button>
						<button onClick={() => updateCount(item, -1)}>-</button>
					</li>
				))}
			</ul>
			<h2>Totalbeløp: {getTotal()} kr</h2>
		</div>
	);
}

export default App;
