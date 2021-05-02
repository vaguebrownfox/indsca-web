import React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		position: "relative",
	},

	bgImage: {
		position: "absolute",
		width: "auto",
		height: "100%",
		boxShadow: "370px 0px 70px 0px #FFF inset",
		borderRadius: theme.spacing(1),

		bottom: 0,
		right: 0,
	},
	overlay: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "rgba(255,255,255,0)",
		boxShadow: "370px 0px 70px 0px #FFF inset",
	},
	cardDetails: {
		flex: 1,
		zIndex: 1,
	},
	cardMedia: {
		width: 200,
		height: 200,
		borderRadius: 4,
		opacity: 0.75,
	},
	description: {
		display: "block",
		textOverflow: "ellipsis",
		wordQrap: "break-word",
		overflow: "hidden",
		height: "8.6em",
		lineHeight: "1.8em",
		width: "50%",
	},
	links: {
		"&:focus,  &:link, &:active": {
			textDecoration: "none",
			color: theme.palette.primary.main,
		},
		"&:hover, &:visited": {
			color: theme.palette.secondary.main,
		},
	},
}));

function FeaturedPost(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<CardActionArea
			component="a"
			href={post.link}
			target="_blank"
			rel="noreferrer"
		>
			<Card className={classes.card}>
				<img
					className={classes.bgImage}
					src={post.image}
					alt={post.imageText}
				/>
				<div className={classes.overlay} />
				<div className={classes.cardDetails}>
					<CardContent>
						<Typography component="h2" variant="h5">
							{post.title}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							{post.date}
						</Typography>
						<Typography
							className={classes.description}
							variant="subtitle1"
							paragraph
						>
							{post.description}
						</Typography>

						<Typography
							className={classes.links}
							variant="body1"
							href={post.link}
							target="_blank"
							rel="noreferrer"
							color="primary"
						>
							Know more
						</Typography>
					</CardContent>
				</div>
			</Card>
		</CardActionArea>
	);
}

FeaturedPost.propTypes = {
	post: PropTypes.shape({
		date: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		imageText: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
};

export default FeaturedPost;
