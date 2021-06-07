import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

const Orders = ({ orders }) => {
	const [session] = useSession();
	return (
		<div>
			<Head>
				<title>Your Orders</title>
			</Head>

			<Header />

			<main className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
					Your Orders
				</h1>

				{session ? (
					<h2>{orders.length} Orders</h2>
				) : (
					<h2>Please Sign in to see your orders.</h2>
				)}

				{orders?.map(
					({
						id,
						amount,
						amountShipping,
						items,
						timestamp,
						images,
					}) => (
						<Order
							key={id}
							id={id}
							amount={amount}
							amountShipping={amountShipping}
							items={items}
							timestamp={timestamp}
							images={images}
						/>
					)
				)}
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	const stripe = require("stripe")("sk_test_51ItxE6Gg6NvF1lJPOsxIgzKy9mftqdKXHhCk7umTH4EAVAMyeVVn3zjVsHSwW7GfRbUPHFfyaIABN2KjScRNjh4V00QOcisehO");

	const session = await getSession(context);

	if (!session) {
		return {
			props: {},
		};
	}

	const stripeOrders = await db
		.collection("users")
		.doc(session.user.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);

	return {
		props: {
			orders,
		},
	};
}

export default Orders;
