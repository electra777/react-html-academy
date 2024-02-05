import React from 'react';

import InitialPage from './components/InitialPage';
import GamePage from './components/GamePage';

const useGame = (images) => {
	const [stepsCount, setStepsCount] = React.useState(0);
	const [finishedItems, setFinishedItems] = React.useState([]);

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

function App({ getImages, results }) {
	const [page, setPage] = React.useState(AppRoute.Initial);
	const [images, setImages] = React.useState([]);
	const [result, setResult] = React.useState(0);
	const [type, setType] = React.useState('');

	const showResults = (stepsCount) => {
		setResult(stepsCount);
		setPage(AppRoute.Results);
	};

	const handleStart = (type) => {
		setImages(getImages(type));
		setPage(AppRoute.Game);
		setType(type);
	};

	const handleReset = () => {
		setPage(AppRoute.Initial);
	};

	const getPage = (route) => {
		switch (route) {
			case AppRoute.Initial:
				return <InitialPage onStart={handleStart} />;
			case AppRoute.Game:
				return <GamePage images={images} onShowResults={showResults} type={type} />;
			case AppRoute.Results:
				return <ResultsPage results={results} current={result} onResetGame={handleReset} />;
			default:
				return null;
		}
	};
	return getPage(page);
}

function Progress({ stepsCount, value, max }) {
	return (
		<>
			<div className="progress-wrapper">
				<div className="progress" style={{ width: `${(value / max) * 100}%` }}></div>
			</div>
			<p className="progress-description">
				Открыто <span>{value}</span> / <span>{max}</span>
			</p>
			<div className="steps">Шаг {stepsCount}</div>
		</>
	);
}

function Modal({ children }) {
	return (
		<div className="modal">
			<div className="modal-box">{children}</div>
		</div>
	);
}

export default App;
