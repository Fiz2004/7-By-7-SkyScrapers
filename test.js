import solvePuzzle from "./main.js";
import { strict as assert2 } from 'assert';
import { time } from "console";

describe("Небоскребы", function () {
	it("Возможность решить 7x7 пазл №1", function () {
		let clues = dgsfgsfg(0);
		let expected = bbbbbbbbvfdg(0);
		let actual = solvePuzzle(clues);
		assert(expected, actual);
	});
	it("Возможность решить 7x7 пазл №2", function () {
		let clues = dgsfgsfg(1);
		let expected = bbbbbbbbvfdg(1);
		let actual = solvePuzzle(clues);
		assert(expected, actual);
	});
	it("Возможность решить 7x7 пазл №3", function () {
		let clues = dgsfgsfg(2);
		let expected = bbbbbbbbvfdg(2);
		let actual = solvePuzzle(clues);
		assert(expected, actual);
	});
});

function dgsfgsfg(test) {
	if (test === 0) return [7, 0, 0, 0, 2, 2, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 3, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4];
	if (test === 1) return [0, 2, 3, 0, 2, 0, 0, 5, 0, 4, 5, 0, 4, 0, 0, 4, 2, 0, 0, 0, 6, 5, 2, 2, 2, 2, 4, 1];
	if (test === 2) return [3, 3, 2, 1, 2, 2, 3, 4, 3, 2, 4, 1, 4, 2, 2, 4, 1, 4, 5, 3, 2, 3, 1, 4, 2, 5, 2, 3];
}

function bbbbbbbbvfdg(test) {
	if (test === 0) return [
		[1, 5, 6, 7, 4, 3, 2],
		[2, 7, 4, 5, 3, 1, 6],
		[3, 4, 5, 6, 7, 2, 1],
		[4, 6, 3, 1, 2, 7, 5],
		[5, 3, 1, 2, 6, 4, 7],
		[6, 2, 7, 3, 1, 5, 4],
		[7, 1, 2, 4, 5, 6, 3]];
	if (test === 1) return [
		[7, 6, 2, 1, 5, 4, 3],
		[1, 3, 5, 4, 2, 7, 6],
		[6, 5, 4, 7, 3, 2, 1],
		[5, 1, 7, 6, 4, 3, 2],
		[4, 2, 1, 3, 7, 6, 5],
		[3, 7, 6, 2, 1, 5, 4],
		[2, 4, 3, 5, 6, 1, 7]];
	if (test === 2) return [
		[2, 1, 4, 7, 6, 5, 3],
		[6, 4, 7, 3, 5, 1, 2],
		[1, 2, 3, 6, 4, 7, 5],
		[5, 7, 6, 2, 3, 4, 1],
		[4, 3, 5, 1, 2, 6, 7],
		[7, 6, 2, 5, 1, 3, 4],
		[3, 5, 1, 4, 7, 2, 6]];
}

function assert(expected, actual) {
	assert2.deepEqual(actual.length, 7);
	for (let i = 0; i < 7; i++) {
		assert2.deepEqual(actual[i].toString(), expected[i].toString());
	}
}

