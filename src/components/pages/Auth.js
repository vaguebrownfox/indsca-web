import React from "react";
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
