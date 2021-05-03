import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";

// Pages
import Home from "./components/pages/Home";
import Header from "./components/pieces/Header";
import Footer from "./components/pieces/Footer";
import About from "./components/pages/About";
import Positions from "./components/pages/Positions";
import Activities from "./components/pages/Activities";

// UI Constants
import {
	headerSections,
	headerTitle,
	headerTag,
} from "./components/constants/headerSections";
import Contact from "./components/pages/Contact";

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
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/about" exact component={About} />
						<Route path="/positions" exact component={Positions} />
						<Route
							path="/activities"
							exact
							component={Activities}
						/>
						<Route path="/contact" exact component={Contact} />
					</Switch>
				</Container>
				<Footer title={headerTag} description={headerTitle} />
			</Router>
			<div></div>
		</>
	);
};

export default App;
