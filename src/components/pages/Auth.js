import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";

import SignUp from "../pieces/SignUp";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
	mainpaper: {
		display: "flex",
		backgroundColor: theme.palette.grey[200],
		height: "100%",
		minHeight: "70vh",
		padding: theme.spacing(0),
		margin: theme.spacing(1),
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.text.secondary,
	},
}));

const AuthSection = () => {
	const [user] = useAuthState(auth());

	useEffect(() => {
		if (auth().isSignInWithEmailLink(window.location.href)) {
			var email = window.localStorage.getItem("emailForSignIn");
			if (!email) {
				email = window.prompt(
					"Please provide your email for confirmation"
				);
			}

			auth()
				.signInWithEmailLink(email, window.location.href)
				.then((result) => {
					window.localStorage.removeItem("emailForSignIn");
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
