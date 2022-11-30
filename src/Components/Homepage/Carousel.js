import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import { useNavigate } from 'react-router-dom';

function BackgroundCSL() {
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	};
	return (
		<Carousel fade>
			<Carousel.Item interval={1200}>
				<img
					className="d-block w-100"
					src="https://i.ibb.co/HFd80NP/wp2529605-16k-wallpapers.jpg"
					height="100%"
					width="100%"
					alt="First slide"
				/>
				{/* <button className="button1" onClick={() => redirectRoute('/signup')}>
					Join Now
				</button> */}
				<Carousel.Caption>
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item interval={1200}>
				<img
					className="d-block w-100"
					src="https://i.ibb.co/HFd80NP/wp2529605-16k-wallpapers.jpg"
					height="100%"
					width="100%"
					alt="Second slide"
				/>

				{/* <button className="button1" onClick={() => redirectRoute('/signup')}>
					Join Now
				</button> */}

				<Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item interval={1200}>
				<img
					className="d-block w-100"
					src="https://i.ibb.co/HFd80NP/wp2529605-16k-wallpapers.jpg"
					height="100%"
					width="100%"
					alt="Third slide"
				/>
				{/* <button className="button1" onClick={() => redirectRoute('/signup')}>
					Join Now
				</button> */}
				<Carousel.Caption>
					<h3>Third slide label</h3>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}

export default BackgroundCSL;
