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

// UI Constants
import {
	headerSections,
	headerTitle,
	headerTag,
} from "./components/constants/headerSections";

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
					</Switch>
				</Container>
				<Footer title={headerTag} description={headerTitle} />
			</Router>
			<div></div>
		</>
	);
};

export default App;
