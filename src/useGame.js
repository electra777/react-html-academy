import React, { useState } from 'react';

const useGame = (images) => {
	const [stepsCount, setStepsCount] = useState(0);
	const [finishedItems, setFinishedItems] = useState([]);

	const checkItems = (firstItem, secondItem) => {
		const firstImage = images.find(({ id }) => id === firstItem);
		const secondImage = images.find(({ id }) => id === secondItem);

		if (firstImage.url === secondImage.url) {
			setFinishedItems((items) => [...items, firstItem, secondItem]);
		}
		setStepsCount((i) => i + 1);
	};

	const isWin = finishedItems.length === images.length && finishedItems.length > 0;

	return {
		finishedItems,
		stepsCount,
		checkItems,
		isWin,
	};
};

export default useGame;
