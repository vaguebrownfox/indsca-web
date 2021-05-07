import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import JoinAuth from "../pieces/JoinAuth";
import JoinNotAuth from "../pieces/JoinNotAuth";

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
			{user ? <JoinAuth email={user.email} /> : <JoinNotAuth />}
		</div>
	);
};

export default Join;
