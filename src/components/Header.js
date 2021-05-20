import Image from "next/image";
import {
	SearchIcon,
	MenuIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";

const Header = () => {
	return (
		<header>
			<div className="flex items-center flex-grow p-1 py-2 bg-amazon_blue">
				<div className="flex items-center flex-grow mt-2 sm:flex-grow-0">
					<Image
						src="https://links.papareact.com/f90"
						width={150}
						height={40}
						objectFit="contain"
						className="cursor-pointer"
					/>
				</div>

				<div className="items-center flex-grow hidden h-10 bg-yellow-400 rounded-md cursor-pointer sm:flex hover:bg-yellow-500">
					<input
						className="flex-grow flex-shrink w-6 h-full p-2 px-4 rounded-l-md focus:outline-none"
						type="text"
					/>
					<SearchIcon className="h-12 p-4" />
				</div>

				<div className="flex items-center mx-6 space-x-6 text-xs text-white">
					<div className="link">
						<p>Hello, Aarav Agarwal</p>
						<p className="font-extrabold md:text-sm">
							Account & Lists
						</p>
					</div>

					<div className="link">
						<p>Returns</p>
						<p className="font-extrabold md:text-sm">& Orders</p>
					</div>

					<div className="relative flex items-center link">
						<span className="absolute top-0 right-0 w-4 h-4 font-bold text-center text-black bg-yellow-400 rounded-full md:right-7">
							0
						</span>

						<ShoppingCartIcon className="h-10" />
						<p className="hidden mt-2 font-extrabold md:inline md:text-sm">
							Cart
						</p>
					</div>
				</div>
			</div>

			<div></div>
		</header>
	);
};

export default Header;
