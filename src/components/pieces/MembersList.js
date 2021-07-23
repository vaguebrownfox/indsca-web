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
import { CircularProgress } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
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
}));

function Member({ bio }) {
	const classes = useStyles();

	return (
		<>
			<ListItem alignItems="flex-start" button>
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
}

export default function MembersList() {
	const classes = useStyles();
	const [members, fetching, error] = useCollectionDataOnce(allMembersQuery);
	React.useEffect(() => {
		console.log(
			"memberlist: ",
			members?.map((d, i) => ({
				d,
				i,
			}))
		);
		console.log("memberlist fetching: ", fetching);
		console.log("memberlist error : ", error);
	}, [members, fetching, error]);

	return (
		<>
			{!fetching ? (
				<>
					<Typography
						className={classes.title}
						variant="h6"
						color="textSecondary"
					>
						Professors
					</Typography>
					<List className={classes.list}>
						{members?.map((bio, i) => (
							<Member key={i} {...{ bio }} />
						))}
					</List>
					<div className={classes.progress}>
						<ArrowDropDownIcon fontSize="large" />
					</div>
				</>
			) : (
				<div className={classes.progress}>
					<CircularProgress color="secondary" size={28} />
				</div>
			)}
		</>
	);
}
