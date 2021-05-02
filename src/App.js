import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";

// Pages
import Home from "./components/pages/Home";
import Header from "./components/pieces/Header";

// UI Constants
import {
	headerSections,
	headerTitle,
} from "./components/constants/headerSections";

const App = () => {
	return (
		<>
			<Router>
				<Container maxWidth="lg">
					<Header title={headerTitle} sections={headerSections} />
					<Switch>
						<Route path="/" exact component={Home} />
					</Switch>
				</Container>
			</Router>
			<div></div>
		</>
	);
};

export default App;
