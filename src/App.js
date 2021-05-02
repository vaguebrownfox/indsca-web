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
	headerTag,
} from "./components/constants/headerSections";
import Footer from "./components/pieces/Footer";

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
					</Switch>
					<Footer title={headerTag} description={headerTitle} />
				</Container>
			</Router>
			<div></div>
		</>
	);
};

export default App;
