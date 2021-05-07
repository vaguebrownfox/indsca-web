import React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardActions, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	media: {
		height: theme.spacing(24),
	},
}));

function FeaturedPost(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={post.image}
					title={post.imageText}
				/>
				<CardContent className={classes.content}>
					<Typography gutterBottom variant="h5" component="h2">
						{post.title}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{post.date}
					</Typography>
					<Typography
						className={classes.description}
						variant="body2"
						color="textPrimary"
						component="p"
					>
						{post.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.action}>
				<Button
					href={post.link}
					target="_blank"
					rel="noreferrer"
					size="small"
					color="primary"
				>
					Know more
				</Button>
			</CardActions>
		</Card>
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
