import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	button: {
		margin: theme.spacing(4, 0),
	},
}));

const JoinNotAuth = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography component="h1" variant="h5" gutterBottom>
				You have to Sign In first.
			</Typography>

			<Button
				className={classes.button}
				variant="outlined"
				color="primary"
				size="large"
				href="/auth"
			>
				Sign In
			</Button>
		</div>
	);
};

export default JoinNotAuth;
