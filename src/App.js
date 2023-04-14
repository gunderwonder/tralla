import React, { useState, useEffect } from 'react';
import './App.css';

const items = [
	{ name: 'Blå 0,5', price: 43 },
	{ name: 'Gul 0,5', price: 37 },
	{ name: 'Gul 0,33', price: 30 },
	{ name: 'Rignes Lite 0,5', price: 43 },
	{ name: 'Grønn 0,33', price: 42 },
	{ name: 'Ginger Joe 0,5', price: 45 },
	{ name: 'Crabbies 0,5', price: 69 },
	{ name: 'Heineken 0,5', price: 62 },
	{ name: 'Hansa 0,5', price: 56 },
	{ name: 'San Miguel 0,5', price: 48 },
	{ name: 'Kronenberg 1664', price: 43 },
	{ name: 'Grevens Cider', price: 47 },
	{ name: 'Corona 0,33', price: 44 },
	{ name: 'Smirnoff Ice 0,33', price: 54 },
	{ name: 'Bulmers 0,5', price: 59 },
	{ name: 'Aas "Pinta"', price: 34 },
	{ name: 'Carlsberg 0,5', price: 41 },
	{ name: 'Schous 0,5', price: 43 },
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

	const resetCounts = () => {
		setCounts({});
		localStorage.removeItem('counts');
	};

	return (
		<div className="App">
			<h1>Trallekalkulator</h1>
			<h2>{getTotal()} kr</h2>
			<button className="reset" onClick={resetCounts}>Nullstill</button>
			<table>
				<tbody>
					{items.map((item) => (
						<tr key={item.name}>
							<td className='item-name'>{item.name}</td>
							<td className='price'>{item.price},-</td>
							<td className='plus'><button onClick={() => updateCount(item, 1)}>+</button></td>
							<td className='count'>{counts[item.name] || 0}</td>
							<td className='plus'><button onClick={() => updateCount(item, -1)}>-</button></td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);
}

export default App;
