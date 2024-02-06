import React, { useState } from 'react';
import InitialPage from './components/InitialPage.jsx';
import GamePage from './components/GamePage.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import { AppRoute } from './settings.js';
import { getImages, results } from './data.js';

function App() {
	const [page, setPage] = useState(AppRoute.Initial);
	const [images, setImages] = useState([]);
	const [result, setResult] = useState(0);
	const [type, setType] = useState('');

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

export default App;
