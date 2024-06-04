import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	const isLastIndex = activeIndex === steps.length - 1;
	const isFirstIndex = activeIndex === 0;
	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const stepForward = () => {
		setActiveIndex((prevState) => prevState + 1);
	};

	const stepBack = () => {
		setActiveIndex((prevState) => prevState - 1);
	};
	const stepStartOver = () => {
		setActiveIndex(0);
	};
	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex]['content']}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map((step, index) => (
							<li
								key={step.id}
								className={
									styles['steps-item'] +
									' ' +
									(index - 1 < activeIndex && styles['done']) +
									' ' +
									(index === activeIndex && styles['active'])
								}
							>
								{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
								<button
									onClick={() => setActiveIndex(index)}
									className={styles['steps-item-button']}
								>
									{index + 1}
								</button>
								{/* При клике на кнопку установка выбранного шага в качестве активного */}
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							disabled={isFirstIndex}
							onClick={stepBack}
							className={styles.button}
						>
							Назад
						</button>
						<button
							onClick={isLastIndex ? stepStartOver : stepForward}
							className={styles.button}
						>
							{isLastIndex ? 'Начать сначала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
