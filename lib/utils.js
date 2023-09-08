import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

Array.prototype.extend = function (iterable) {
	if (typeof iterable[Symbol.iterator] === 'function') {
		for (const item of iterable) {
			this.push(item);
		}
	} else {
		throw new Error('Argument is not iterable');
	}
};
