import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Tooltip } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import { indscaAdmin } from "../constants/contacts";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		height: "100%",
		minHeight: "70vh",
		margin: theme.spacing(1),
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.text.secondary,
		backgroundColor: theme.palette.grey[200],
	},
	listroot: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	listitem: {
		cursor: "pointer",
	},
}));

const Contact = () => {
	const classes = useStyles();
	return (
		<div>
			<Paper className={classes.paper}>
				<ContactList />
			</Paper>
		</div>
	);
};

const copyToClipboard = (e, text) => {
	navigator.clipboard.writeText(text);
};

const ContactList = () => {
	const classes = useStyles();

	return (
		<List className={classes.listroot}>
			<div
				className={classes.listitem}
				onClick={(e) => copyToClipboard(e, indscaAdmin.email)}
			>
				<Tooltip title="Click to copy email">
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<MailIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={indscaAdmin.type}
							secondary={indscaAdmin.email}
						/>
					</ListItem>
				</Tooltip>
			</div>
		</List>
	);
};

export default Contact;
