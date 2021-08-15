import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
	tweetDiv: {
		height: 500,
		overflow: "auto",
	},
}));

const TwitterHandle = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h6" gutterBottom>
				{`Announcements`}
			</Typography>
			<div className={classes.tweetDiv}>
				<a
					className="twitter-timeline"
					data-lang="en"
					data-height="500"
					data-dnt="true"
					href="https://twitter.com/IndianSpeechCo1?ref_src=twsrc%5Etfw"
				>
					Tweets by IndianSpeechCo1
				</a>
			</div>
		</div>
	);
};

export default TwitterHandle;
