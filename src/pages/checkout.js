import Image from "next/image";
import Header from "../components/Header";
import Head from "next/head";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function Checkout() {
	const [session] = useSession();
	const total = useSelector(selectTotal);
	const items = useSelector(selectItems);

	const createCheckoutSession = async () => {
		const stripe = await stripePromise;

		const checkoutSession = await axios.post(
			"/api/create-checkout-session",
			{
				items: items,
				email: session.user.email,
			}
		);

		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});

		if (result.error) alert(result.error.message);
	};

	return (
		<div className="bg-gray-100">
			<Head>
				<title>Your Cart</title>
			</Head>
			<Header />

			<main className="lg:flex max-w-screen-2xl mx-auto">
				<div className="flex-grow m-5 shadow-sm">
					<Image
						src="https://links.papareact.com/ikj"
						width={1020}
						height={250}
						objectFit="contain"
					/>
					<div className="flex flex-col p-5 space-y-10 bg-white">
						<h1 className="text-3xl border-b pb-4">
							{items.length === 0
								? "Your Amazon Cart is Empty"
								: `You have ${
										items.length === 1
											? "1 item"
											: `${items.length} items`
								  } in Your Cart`}
						</h1>

						{items.map((item, i) => (
							<CheckoutProduct
								key={i}
								id={item.id}
								title={item.title}
								price={item.price}
								rating={item.rating}
								description={item.description}
								categroy={item.categroy}
								image={item.image}
								hasPrime={item.hasPrime}
							/>
						))}
					</div>
				</div>

				<div className="flex flex-col bg-white p-10 shadow-sm">
					{items.length > 0 && (
						<>
							<h2 className="whitespace-nowrap">
								Subtotal ({items.length} items):
								<span className="font-bold">
									{" "}
									<Currency quantity={total} currency="USD" />
								</span>
							</h2>

							<button
								role="link"
								onClick={() => createCheckoutSession()}
								className={`button mt-2 ${
									!session &&
									"from-gray-300 to-gray-500 border-gray-600 cursor-not-allowed"
								}`}
								disabled={!session}
							>
								{!session
									? "Sign in to checkout"
									: "Proceed to Checkout"}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
}

export default Checkout;
