import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LinearProgress from "@material-ui/core/LinearProgress";
import { fade } from "@material-ui/core/styles";
import MembersList from "../pieces/MembersList";
import MemberContent from "../pieces/MemberContent";
import { allMembersQuery } from "../../firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Grow, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		minHeight: "60vh",
		margin: theme.spacing(1, 0),
	},
	progress: {
		width: "100%",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.grey[400], 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.primary.main, 0.1),
		},
		margin: theme.spacing(1, 2, 1, 0),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(2),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const Members = () => {
	const classes = useStyles();
	const [members, fetching, error] = useCollectionDataOnce(allMembersQuery);

	const [memberBio, setMemberBio] = React.useState(null);

	const selectMemberHandler = (bio) => {
		setMemberBio(bio);
	};

	return (
		<>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
				/>
				<div className={classes.progress}>
					{/* // TODO: loading state */}
					{false && <LinearProgress variant="indeterminate" />}
				</div>
			</div>
			<div className={classes.paper}>
				<Grid className={classes.grid} container spacing={2}>
					<Grid xs={12} sm={6} md={4} item>
						<MembersList
							{...{
								selectMemberHandler,
								members,
								fetching,
								error,
							}}
						/>
					</Grid>
					<Hidden xsDown>
						<Grow in={memberBio ? true : false}>
							<Grid xs={12} sm={6} md={8} item>
								<MemberContent bio={memberBio} />
							</Grid>
						</Grow>
					</Hidden>
				</Grid>
			</div>
		</>
	);
};

export default Members;
