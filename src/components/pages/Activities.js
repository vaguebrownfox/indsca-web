import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		minHeight: "70vh",
		margin: theme.spacing(1),
	},
	button: {
		minHeight: 100,
		width: "100%",
		padding: theme.spacing(4),
		backgroundColor: theme.palette.grey[400],
		color: theme.palette.text.secondary,

		fontSize: "2.5vmin",
	},
}));

const Activities = () => {
	const classes = useStyles();

	const onActivitySelect = (item) => {
		console.log("Activity item", item);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{activities.map((activity, i) => (
					<Grid key={i} item md={3} xs={12} alignItems="stretch">
						<Button
							className={classes.button}
							variant="contained"
							onClick={() => onActivitySelect(activity)}
							href={activity.path}
						>
							{activity.title}
						</Button>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

const activities = [
	{
		title: "Grants",
		tag: "grants",
		path: "/activities/grants",
	},
	{
		title: "Talks",
		tag: "talks",
		path: "/activities/talks",
	},
	{
		title: "Theses",
		tag: "theses",
		path: "/activities/theses",
	},
	{
		title: "Publications",
		tag: "publications",
		path: "/activities/publications",
	},
	{
		title: "Workshops",
		tag: "workshops",
		path: "/activities/workshops",
	},
	{
		title: "Conferences",
		tag: "conferences",
		path: "/activities/conferences",
	},
	{
		title: "Schools",
		tag: "schools",
		path: "/activities/schools",
	},
	{
		title: "Challenges",
		tag: "challenges",
		path: "/activities/challenges",
	},
	{
		title: "Opportunities",
		tag: "opportunities",
		path: "/activities/opportunities",
	},
];

export default Activities;
