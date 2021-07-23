import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Hidden } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
	listSection: {
		display: "flex",
		justifyContent: "space-between",
	},
	listDiv: {
		flex: 1,
	},
	list: {
		width: "100%",
		height: "60vh",
		backgroundColor: theme.palette.background.paper,
		overflow: "scroll",
	},
	inline: {
		display: "inline",
		maxWidth: "36ch",
	},
	title: {
		padding: theme.spacing(1, 2, 0),
	},
	progress: {
		display: "flex",
		justifyContent: "center",
	},
	divider: {
		padding: theme.spacing(4, 0, 4, 2),
	},
}));

export default function MembersList({
	selectMemberHandler,
	members,
	fetching,
	error,
}) {
	const classes = useStyles();

	return (
		<>
			{!fetching ? (
				<div className={classes.listSection}>
					<div className={classes.listDiv}>
						<Typography
							className={classes.title}
							variant="h6"
							color="textSecondary"
						>
							Professors
						</Typography>
						<List className={classes.list}>
							{members?.map((bio, i) => (
								<Member
									key={i}
									{...{ bio, selectMemberHandler }}
								/>
							))}
						</List>
						<div className={classes.progress}>
							<ArrowDropDownIcon
								fontSize="large"
								color="primary"
							/>
						</div>
					</div>
					<Hidden xsDown>
						<div className={classes.divider}>
							<Divider
								orientation="vertical"
								variant="fullWidth"
							/>
						</div>
					</Hidden>
				</div>
			) : (
				<div className={classes.progress}>
					{!error ? (
						<CircularProgress color="secondary" size={28} />
					) : (
						<Typography
							className={classes.title}
							variant="body1"
							color="textPrimary"
						>
							Error loading members! Please refresh...
						</Typography>
					)}
				</div>
			)}
		</>
	);
}

const Member = ({ bio, selectMemberHandler }) => {
	const classes = useStyles();

	const selectMember = () => {
		selectMemberHandler(bio);
	};

	return (
		<>
			<ListItem alignItems="flex-start" button onClick={selectMember}>
				<ListItemAvatar>
					<Avatar alt={bio.name} src={bio.imageLink} />
				</ListItemAvatar>
				<ListItemText
					primary={bio.name}
					secondary={
						<Typography
							component="span"
							variant="body2"
							className={classes.inline}
							color="textSecondary"
						>
							{`${bio.organisation} | ${bio.place}`}
						</Typography>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</>
	);
};
