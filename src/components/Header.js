import Image from "next/image";
import {
	SearchIcon,
	MenuIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from 'next-auth/client'

const Header = () => {
	const [session] = useSession();

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
					<div className="link" onClick={!session ? signIn : signOut}>
						<p>Hello, {session ? `Hello, ${session.user.name}` : `Hello, Sign In`}</p>
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

			<div className="flex items-center p-2 pl-6 space-x-3 text-sm text-white bg-amazon_blue-light">
				<p className="flex items-center link">
					<MenuIcon className="h-6 mr-1" />
					All
				</p>
				<p className="link">Prime Video</p>
				<p className="link">Amazon's Business</p>
				<p className="link">Today's Deals</p>
				<p className="hidden link lg:inline-flex">Electronics</p>
				<p className="hidden link lg:inline-flex">Food & Grocery</p>
				<p className="hidden link lg:inline-flex">Prime</p>
				<p className="hidden link lg:inline-flex">Buy it Again</p>
				<p className="hidden link lg:inline-flex">Shopper Toolkit</p>
				<p className="hidden link lg:inline-flex">Health & Personal Care</p>
			</div>
		</header>
	);
};

export default Header;
