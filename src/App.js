import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";

// Pieces
import Header from "./components/pieces/Header";
import Footer from "./components/pieces/Footer";

// UI Constants
import {
	headerSections,
	headerTitle,
	headerTag,
} from "./components/constants/headerSections";

// Pages
const Home = lazy(() => import("./components/pages/Home"));
const About = lazy(() => import("./components/pages/About"));
const Positions = lazy(() => import("./components/pages/Positions"));
const Activities = lazy(() => import("./components/pages/Activities"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Auth = lazy(() => import("./components/pages/Auth"));

const App = () => {
	return (
		<>
			<Router>
				<Container maxWidth="lg">
					<Header
						tag={headerTag}
						title={headerTitle}
						sections={headerSections}
					/>
					<Suspense
						fallback={
							<div
								style={{
									minHeight: "70vh",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<CircularProgress color="secondary" size={28} />
							</div>
						}
					>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/about" exact component={About} />
							<Route
								path="/positions"
								exact
								component={Positions}
							/>
							<Route
								path="/activities"
								exact
								component={Activities}
							/>
							<Route path="/contact" exact component={Contact} />
							<Route path="/auth" exact component={Auth} />
						</Switch>
					</Suspense>
				</Container>
				<Footer title={headerTag} description={headerTitle} />
			</Router>
			<div></div>
		</>
	);
};

export default App;
