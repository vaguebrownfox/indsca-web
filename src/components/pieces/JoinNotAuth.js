import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		//
	},
}));

const JoinNotAuth = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<p>"not logged in</p>
		</div>
	);
};

export default JoinNotAuth;
