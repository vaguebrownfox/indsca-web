import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		height: theme.spacing(24),
		width: theme.spacing(24),
		borderRadius: "50%",
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.palette.grey[200],
		height: "100%",
		minHeight: "70vh",
		padding: theme.spacing(2),
		margin: theme.spacing(4),
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.text.secondary,
	},
	body: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		maxWidth: 696,
		color: grey[900],
	},
}));

const About = () => {
	const classes = useStyles();
	return (
		<div>
			<Paper className={classes.paper}>
				<img
					className={classes.logo}
					src={"/logo/icon_512.png"}
					alt={"IndSCA logo"}
				/>
				<Typography variant="h4" component="div">
					About IndSCA
				</Typography>

				<Typography
					className={classes.body}
					variant="body1"
					component="div"
				>
					Indian Speech Communication Association or IndSCA is a
					community/committee formed with distinguished faculty
					members from different institutions of India. With boosting
					speech, language and audio research activity in India as one
					of the major objectives, IndSCA is the pioneer committee in
					above mentioned subjects in the country. It also offers
					student travel grants to major international speech
					conference such as NIPS, ICML, Interspeech, ICASSP.
				</Typography>
				<Typography
					className={classes.body}
					variant="body1"
					component="div"
				>
					This web-page is the one-stop guide to the services offered
					by IndSCA such as upcoming workshops, lectures by the member
					professors, application of grants, upcoming and on-going
					workshops and many more along with possible internship
					opportunities for current students from across the country
					under the member professors.
				</Typography>
			</Paper>
		</div>
	);
};

export default About;
