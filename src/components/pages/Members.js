import React, { useContext, useEffect, useState } from "react";

import Member from "./Member";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Button } from "@material-ui/core";

// Context
import {
	Provider as MemberProvider,
	Context as MembersContext,
} from "../../context/data/MembersContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: "100%",
		minHeight: "70vh",
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	grid: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.black, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
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
	progress: {
		width: "100%",
		padding: theme.spacing(2),
	},
	addButton: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

// const members = [
// 	{
// 		name: "Dr. First Second Last",
// 		institution: "Indian Institute of Science",
// 		image:
// 			"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
// 		imageText: "Dr. First Second Last",
// 		place: "Bangalore",
// 	},
// ];

const MembersComponent = ({ history }) => {
	const classes = useStyles();
	const { state, updateMembers } = useContext(MembersContext);
	useEffect(() => {
		updateMembers();
		return () => {
			console.log("Members cleanup");
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
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
			</div>
			<div className={classes.progress}>
				{state.loading && <LinearProgress variant="indeterminate" />}
				{/* {<CircularProgress />} */}
			</div>
			{/* {Auth component} */}
			{/* <div className={classes.addButton}>
				<Button variant="outlined" color="primary">
					Add Member
				</Button>
			</div> */}
			<div className={classes.root}>
				<Grid className={classes.grid} container spacing={2}>
					<React.Fragment>
						{state.members.map((member, i) => (
							<Grid key={i} item>
								<Member {...{ member, history }} />
							</Grid>
						))}
					</React.Fragment>
				</Grid>
			</div>
		</>
	);
};
const Members = ({ history }) => (
	<MemberProvider>
		<MembersComponent {...{ history }} />
	</MemberProvider>
);

export default Members;
