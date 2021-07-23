import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { allMembersQuery } from "../../firebase/firestore";
import { CardMedia, CircularProgress, Grid } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
	contentRoot: {
		//
	},
	mediaDiv: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	media: {
		height: 128,
		width: 128,
		margin: theme.spacing(4, "auto", 2),
		borderRadius: theme.spacing(1),
	},
}));

const MemberContent = ({ bio }) => {
	const classes = useStyles();

	return (
		<Grid className={classes.contentRoot} container>
			<Grid xs={12} item>
				<div className={classes.mediaDiv}>
					<CardMedia
						className={classes.media}
						image={bio?.imageLink}
					/>
					<Typography variant="h6" gutterBottom>
						<b>{bio?.name}</b>
					</Typography>
				</div>
				<Divider />
			</Grid>
			<Grid xs={12} item>
				<div>content</div>
			</Grid>
		</Grid>
	);
};

export default MemberContent;
