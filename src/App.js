import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const httpLink = new HttpLink({
	uri: "http://localhost:8800/graphql",
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
	// The `from` function combines an array of individual links
	// into a link chain
	link: from([errorLink, httpLink]),
	cache: cache,
});

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<div className="App">
					<Header />
					<div className="container">
						<Routes>
							<Route
								path="/"
								element={<Home />}
							/>
							<Route
								path="/projects/:id"
								element={<Project />}
							/>
							<Route
								path="*"
								element={<NotFound />}
							/>
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
