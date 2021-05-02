import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Timeline } from "react-twitter-widgets";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}));

const TwitterHandle = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h6" gutterBottom>
				{`Announcements`}
			</Typography>
			<Timeline
				dataSource={{
					sourceType: "profile",
					screenName: "IndianSpeechCo1",
				}}
				options={{
					height: "500",
				}}
			/>
		</div>
	);
};

export default TwitterHandle;
