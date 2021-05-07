import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		minHeight: "70vh",
		margin: theme.spacing(1),
	},
}));

const Join = () => {
	const classes = useStyles();
	const [user] = useAuthState(auth());

	return (
		<div className={classes.paper}>
			{user ? <JoinAuth /> : <JoinNotAuth />}
		</div>
	);
};

export default Join;

const JoinAuth = () => {
	return (
		<div>
			<p>"logged in, join IndSCA"</p>
		</div>
	);
};

const JoinNotAuth = () => {
	return (
		<div>
			<p>"not logged in"</p>
		</div>
	);
};
