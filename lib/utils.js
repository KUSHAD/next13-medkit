import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function groupAndSumByKey(items, key) {
	const grouped = [];
	const result = [];

	items.reduce(function (res, value) {
		if (!res[value[key]]) {
			res[value[key]] = {
				[key]: value[key],
				amount: 0,
			};
			result.push(res[value[key]]);
		}
		res[value[key]].amount += Number(value.amount);
		return res;
	}, {});

	grouped.push(result);

	return grouped;
}
