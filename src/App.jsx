import React from 'react';

import getDeclension from '@dubaua/get-declension';

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

function GamePage({ images = [], onShowResults, type }) {
	const { finishedItems, stepsCount, checkItems, isWin } = useGame(images);

	const handleResultsClick = () => {
		onShowResults(stepsCount);
	};

	return (
		<section className="game container">
			<Progress stepsCount={stepsCount} value={finishedItems.length / 2} max={images.length / 2} />
			<Grid images={images} checkItems={checkItems} finishedItems={finishedItems} type={type} />
			{isWin && (
				<Modal>
					<h3 className="modal-caption">Победа!</h3>
					<p className="modal-description">Теперь давайте узнаем результаты этой партии</p>
					<button onClick={handleResultsClick} className="button modal-button">
						Показать результаты
					</button>
				</Modal>
			)}
		</section>
	);
}

function ResultsPage({ results, current, onResetGame }) {
	const wordsDeclension = getDeclension({
		count: current,
		one: 'шаг',
		few: 'шага',
		many: 'шагов',
	});

	return (
		<section className="result container">
			<h2>Лучшие результаты:</h2>
			<p>
				Вы завершили игру за <b>{wordsDeclension}</b>, так держать!
			</p>
			<ResultsTable current={current} results={results} />
			<p>Хотите попробовать ещё раз?</p>
			<button onClick={onResetGame} className="button result-button" type="button">
				Новая игра
			</button>
		</section>
	);
}

function ResultsTable({ current, results }) {
	const sortedResults = [...results, { name: 'Ваш результат', stepsCount: current }].sort(
		(a, b) => a.stepsCount - b.stepsCount,
	);

	return (
		<table className="result-table">
			<thead>
				<tr className="result-table-row">
					<th>Место</th>
					<th>Имя</th>
					<th>Шаги</th>
				</tr>
			</thead>
			<tbody>
				{sortedResults.map(({ name, stepsCount }, index) => (
					<tr key={name} className={`result-table-row ${stepsCount === current ? 'active' : ''}`}>
						<td>{index + 1}</td>
						<td>{name}</td>
						<td>{stepsCount}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
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

function Grid({ images = [], finishedItems, checkItems, type }) {
	const [visibleItems, setVisibleItems] = React.useState([]);

	const handleCardClick = (id) => {
		if (visibleItems.includes(id) || finishedItems.includes(id)) {
			return;
		}

		switch (visibleItems.length) {
			case 0:
				setVisibleItems([id]);
				break;
			case 1:
				setVisibleItems((items) => [...items, id]);
				checkItems(visibleItems[0], id);
				setTimeout(() => {
					setVisibleItems([]);
				}, TIMEOUT);
				break;
			default:
				setVisibleItems([]);
		}
	};

	return (
		<ul className={`cards cards-theme-${type}`}>
			{images.map((item) => (
				<Card
					key={item.id}
					id={item.id}
					url={item.url}
					description={item.description}
					isVisible={visibleItems.includes(item.id)}
					isFinished={finishedItems.includes(item.id)}
					onCardClick={handleCardClick}
				/>
			))}
		</ul>
	);
}

function Card({ id, url, description, isVisible, isFinished, isChecking, onCardClick, type }) {
	const className = `${isVisible ? 'card-show' : ''} ${isFinished ? 'card-finished' : ''}`;

	const handleClick = () => {
		onCardClick(id);
	};

	return (
		<li onClick={handleClick} className={`card ${className}`}>
			<img width="204" height="144" src={url} alt={description} />
		</li>
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
