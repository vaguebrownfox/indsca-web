import React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {
	Backdrop,
	Button,
	CardActions,
	CardMedia,
	Fade,
	GridList,
	GridListTile,
	GridListTileBar,
	Modal,
} from "@material-ui/core";

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
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	backdrop: {
		margin: theme.spacing(8),
		// border: `2px solid #ff0`,
	},
	preview: {
		backgroundColor: theme.palette.background.paper,
		// border: `2px solid`,
		borderRadius: 8,
		// borderColor: theme.palette.primary.main,
	},
	modalimg: {
		width: "100%",
		height: "100%",
		marginBottom: theme.spacing(1),
		borderRadius: 8,
	},

	gridList: {
		flexWrap: "nowrap",
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		// transform: "translateZ(0)",
	},
	gridListTitle: {
		position: "relative",
		float: "left",
		width: "100%",
		maxHeight: theme.spacing(128),
		maxWidth: theme.spacing(64),
		overflow: "visible",
		height: "100% !important",
	},
	title: {
		color: theme.palette.background.paper,
	},
	titleBar: {
		background:
			"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
	},
}));

function FeaturedPost(props) {
	const classes = useStyles();
	const { post } = props;

	const [openModal, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Card className={classes.root}>
			<CardActionArea onClick={handleOpen}>
				<CardMedia
					className={classes.media}
					image={post.image[0]}
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
				{post?.poster && (
					<Button
						aria-label={`download ${post.title}`}
						variant="outlined"
						size="small"
						color="primary"
						href={post.poster}
						target="_blank"
						rel="noreferrer"
					>
						View poster
					</Button>
				)}
			</CardActions>
			<Modal
				aria-labelledby="featured-post-modal"
				aria-describedby="featured-post-modal-poster-view"
				className={classes.modal}
				open={openModal}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openModal}>
					<div className={classes.backdrop}>
						<div className={classes.preview}>
							{/* <img
								className={classes.modalimg}
								src={post.image[0]}
								title={post.imageText}
							/>
							<Typography
								variant="h6"
								align="center"
								color="textSecondary"
							>
								<b>{post.title}</b>
							</Typography> */}

							<GridList className={classes.gridList} cols={1}>
								{post.image.map((img, i) => (
									<GridListTile
										className={classes.gridListTitle}
										key={i}
										classes={{
											root: classes.root, // class name, e.g. `classes-nesting-root-x`
											imgFullHeight: classes, // class name, e.g. `classes-nesting-label-x`
										}}
									>
										<img
											className={classes.modalimg}
											src={img}
											alt={post.imageText}
										/>
										<GridListTileBar
											title={post.title}
											classes={{
												root: classes.titleBar,
												title: classes.title,
											}}
											// actionIcon={
											// 	<IconButton
											// 		aria-label={`star ${post.title}`}
											// 	>
											// 		<StarBorderIcon
											// 			className={
											// 				classes.title
											// 			}
											// 		/>
											// 	</IconButton>
											// }
										/>
									</GridListTile>
								))}
							</GridList>
						</div>
					</div>
				</Fade>
			</Modal>
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
