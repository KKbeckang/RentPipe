import React from 'react';
import './Intro.css';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	};
	return (
		<div className="intro-div">
			<div className="landing-body">
				<div className="landing-text-info-area">
					<p className="landing-text__title">RentPipe</p>
					<p className="landing-text__title">Renting Made Easy</p>
					<p className="landing-text__paragraph">
						*Add tag line*
					</p>
					<button
						className="btn btn-primary"
						onClick={() => redirectRoute('/signup')}
					>
						Get Started
					</button>
				</div>
				<div>
					<h1>*add image*</h1>
					{/*<img className="pig" src="" alt=" " /> */}
				</div>
			</div>
		</div>
	);
};

export default Intro;
