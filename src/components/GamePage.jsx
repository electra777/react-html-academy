import Progress from './Progress';
import Grid from './Grid';
import Modal from './Modal';

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

export default GamePage;
