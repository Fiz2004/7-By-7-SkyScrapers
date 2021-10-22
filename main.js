const SIZE = 7;

export default function solvePuzzle(clues) {
	let cashOptions = getCashOptions();
	let cashClues = getStartCashClues(clues, cashOptions);
	cashClues = filterCash(cashClues);
	return generateTable(cashClues, clues);
}

function getCashOptions() {
	let result = [];
	result[0] = generate();
	for (let row of result[0]) {
		let clue = getClues(row);
		result[clue] = result[clue] || [];
		result[clue].push(row);
	}

	return result;
}

function generate(row = []) {
	let result = [];
	if (row.length === SIZE) {
		result.push([...row]);
	} else {
		for (let i = 1; i <= SIZE; i++) {
			if (row.includes(i)) continue;
			row.push(i);
			result.push(...generate(row));
			row.pop(i);
		}
	}
	return result;
}

function getClues(array) {
	return array.reduce((acc, each) => each > acc[1] ? [acc[0] + 1, each] : acc, [0, 0])[0]
}

function getStartCashClues(clues, cashOptions) {
	let cashClues = [...clues];

	for (let i = 0; i < SIZE; i++) {
		let index1 = i;
		let index2 = (SIZE * 3 - 1) - i;
		let clue1 = cashClues[index1];
		let clue2 = cashClues[index2];
		if (clue1 === 0 && clue2 === 0) {
			cashClues[i] = [...cashOptions[0]]
		} else {
			let cashClue1 = [...cashOptions[clue1]];
			let cashClue2 = [...cashOptions[clue2]].map(el => [...el].reverse());
			cashClues[i] = [...select(cashClue1, cashClue2)];
		}
	}

	for (let i = SIZE; i < 2 * SIZE; i++) {
		let index1 = i;
		let index2 = (SIZE * 4 - 1) - (i - SIZE);
		let clue1 = cashClues[index1];
		let clue2 = cashClues[index2];
		if (clue1 === 0 && clue2 === 0) {
			cashClues[i] = [...cashOptions[0]]
		} else {
			let cashClue1 = [...cashOptions[clue1]].map(el => [...el].reverse());
			let cashClue2 = [...cashOptions[clue2]];
			cashClues[i] = [...select(cashClue1, cashClue2)];
		}
	}

	cashClues = cashClues.slice(0, SIZE * 2);

	return cashClues;
}

function select(cashClue1, cashClue2) {
	return cashClue1.filter((el1 => {
		let cash = [...cashClue2];
		for (let j = 0; j < el1.length; j++) {
			cash = cash.filter(el2 => el2[j] === el1[j]);
		}
		return cash.length > 0 ? true : false;
	}));
}

function filterCash(cashClues) {
	let result = [...cashClues];
	let col = result.reduce((acc, el) => acc + el.length, 0);
	result = filterCashCluesColumn(result);
	result = filterCashCluesRow(result);

	if (result.reduce((acc, el) => acc + el.length, 0) === col)
		return result;

	return filterCash(result)
}

function filterCashCluesColumn(cashClues) {
	let result = [...cashClues];
	for (let column = 0; column < SIZE; column++) {
		result[column] = result[column].filter(elC => {
			let filterValue = true;
			for (let row = 0; row < SIZE; row++) {
				filterValue = result[SIZE + row].some(el => el[column] === elC[row])
				if (filterValue === false) return false
			}
			return true;
		});
	}

	return result;
}

function filterCashCluesRow(cashClues) {
	let result = [...cashClues];
	for (let row = 0; row < SIZE; row++) {
		result[SIZE + row] = result[SIZE + row].filter(elC => {
			let filterValue = true;
			for (let column = 0; column < SIZE; column++) {
				filterValue = result[column].some(el => el[row] === elC[column])
				if (filterValue === false) return false
			}
			return true;
		});
	}

	return result;
}

function generateTable(cashClues, clues, table = [], indexRow = 0) {
	let result = [];
	for (let row of cashClues[SIZE + indexRow])
		if (isTestTable(table, indexRow, row)) {
			table[indexRow] = [...row];
			if (indexRow === (SIZE - 1)) {
				if (compare(getCluesAll(table), clues))
					return table;
			} else {
				result = generateTable(cashClues, clues, [...table], indexRow + 1);
				if (result)
					return result;
			}
		}
}

function compare(currentClues, StandartClues) {
	for (let i = 0; i < currentClues.length; i++) {
		if (StandartClues[i] !== 0)
			if (currentClues[i] !== StandartClues[i])
				return false
	}
	return true;
}

function isTestTable(table, indexRow, row) {
	let tempTable = [...table];
	tempTable[indexRow] = [...row];
	for (let index = 0; index < SIZE; index++) {
		let column = tempTable.map(curRow => curRow[index]);
		for (let i = 0; i < column.length; i++)
			if (column[i] && column.includes(column[i], i + 1))
				return false;

	}
	return true;
}

function getCluesAll(table) {
	let result = [];
	for (let i = 0; i < SIZE; i++)
		result.push(getClues(table.map(el => el[i])));
	for (let i = 0; i < SIZE; i++)
		result.push(getClues([...table[i]].reverse()));
	for (let i = 0; i < SIZE; i++)
		result.push(getClues(table.map(el => el[SIZE - 1 - i]).reverse()));
	for (let i = 0; i < SIZE; i++)
		result.push(getClues([...table[SIZE - 1 - i]]));
	return result;
}
