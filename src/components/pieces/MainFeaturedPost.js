import React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
	mainFeaturedPost: {
		position: "relative",
		overflow: "hidden",
		marginBottom: theme.spacing(4),
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary.dark,
	},
	bgImage: {
		position: "absolute",
		width: "100%",
		height: "auto",
	},
	overlay: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "rgba(0,0,0,.75)",
	},
	mainFeaturedPostContent: {
		position: "relative",
		padding: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	link: {
		color: theme.palette.common.white,
		textDecoration: "none",
	},
}));

function MainFeaturedPost(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Paper className={classes.mainFeaturedPost}>
			<img
				className={classes.bgImage}
				src={post.image}
				alt={post.imageText}
			/>

			<div className={classes.overlay} />
			<Grid container>
				<Grid item md={6}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography
							component="h1"
							variant="h3"
							color="inherit"
							gutterBottom
						>
							{post.title}
						</Typography>
						<Typography variant="h5" color="inherit" paragraph>
							{post.description}
						</Typography>
						<Link variant="subtitle1" href="#">
							<div className={classes.link}>{post.linkText}</div>
						</Link>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}

MainFeaturedPost.propTypes = {
	post: PropTypes.shape({
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		imageText: PropTypes.string.isRequired,
		linkText: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
};

export default MainFeaturedPost;
