import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
	return (
		<div className="relative">
			<Carousel
				autoPlay
				infiniteLoop
				showStatus={false}
				showIndicators={false}
				showThumbs={false}
				interval={5000}
			>
				<div>
					<img loading="lazy" src="https://links.papareact.com/gi1" />
				</div>

				<div>
					<img loading="lazy" src="https://links.papareact.com/6ff" />
				</div>

				<div>
					<img loading="lazy" src="https://links.papareact.com/7ma" />
				</div>
			</Carousel>
			<div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0"></div>
		</div>
	);
};

export default Banner;
