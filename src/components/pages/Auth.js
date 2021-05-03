import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Paper } from "@material-ui/core";

import SignUp from "../pieces/SignUp";

const useStyles = makeStyles((theme) => ({
	mainpaper: {
		display: "flex",
		backgroundColor: theme.palette.grey[200],
		height: "100%",
		minHeight: "70vh",
		margin: theme.spacing(1),
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.text.secondary,
	},
}));

const AuthSection = () => {
	const [user] = useAuthState(auth());
	const [type, setType] = useState("");

	useEffect(() => {
		const url = window.location.href;
		const isEmailLink = auth().isSignInWithEmailLink(url);
		if (isEmailLink && !user) {
			var email = window.localStorage.getItem("emailForSignIn");
			if (!email) {
				email = window.prompt(
					"Please provide your email for confirmation"
				);
			}

			auth()
				.signInWithEmailLink(email, url)
				.then((result) => {
					window.localStorage.removeItem("emailForSignIn");

					let parsee = window.location.search;
					const val = new URLSearchParams(parsee).get("type");
					setType(val);
				})
				.catch((e) => {
					console.log("indsca email link url error", e);
				});
		}
		return () => {
			console.log("auth route cleanup");
		};
	}, []);

	const classes = useStyles();
	return (
		<Paper className={classes.mainpaper}>
			<Container component="main" maxWidth="xs">
				{user ? "<Invite user={user} />" : <SignUp />}
			</Container>
		</Paper>
	);
};

export default AuthSection;
