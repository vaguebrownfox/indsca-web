import React, { useEffect, useState } from "react";
import emailRx from "email-regex";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../../firebase/firebase";
import { invitesQuery, setInvite } from "../../firebase/firestore";
import { INVITE_LIMIT } from "../../admin/adminConstants";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import MessageRounded from "@material-ui/icons/EmailRounded";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
		padding: theme.spacing(2),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	links: {
		"&:focus, &:visited, &:link, &:active": {
			textDecoration: "none",
			color: theme.palette.primary.main,
		},
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	info: {
		marginTop: theme.spacing(1),
		color: theme.palette.error,
		fontSize: "0.77em",
	},
	list: {
		margin: "8px 0px",
	},
	listhead: {
		color: theme.palette.secondary.main,
	},
}));

const Invite = ({ user }) => {
	const classes = useStyles();

	const [invites] = useCollectionData(invitesQuery(user.uid));

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [valid, setValid] = useState(false);

	const sendInvite = async () => {
		setInvite(name, email, user.uid).then(() => {
			setName("");
			setEmail("");
		});
	};

	useEffect(() => {
		if (emailRx().test(email) && name.length > 0) {
			name.length > 0 && setValid(true);
		} else {
			setValid(false);
		}
	}, [email, name]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<MessageRounded />
			</Avatar>
			<Typography component="h1" variant="h5">
				Invite
			</Typography>
			<Typography variant="body">{`Logged in with ${user.email}`}</Typography>

			<div className={classes.list}>
				<Typography
					className={classes.listhead}
					component="div"
					variant="body1"
				>
					You have invited...
				</Typography>
				{invites && (
					<List component="nav" aria-label="main mailbox folders">
						{invites.length > 0 ? (
							invites?.map((item, i) => (
								<ListItem button key={i}>
									<ListItemIcon>
										<DraftsIcon />
									</ListItemIcon>
									<ListItemText
										primary={`${item?.name} : ${item?.email}`}
									/>
								</ListItem>
							))
						) : (
							<Typography variant="caption">{`*Nobody*`}</Typography>
						)}
					</List>
				)}
			</div>

			<Divider />

			{invites?.length < INVITE_LIMIT && (
				<form
					className={classes.form}
					noValidate
					onSubmit={(e) => e.preventDefault()}
				>
					<Grid container spacing={2} justify="center">
						<Grid item xs={8}>
							<TextField
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								autoComplete="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={8}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email ID"
								name="emailId"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={!valid && email.length > 0}
							/>
						</Grid>
					</Grid>

					<Button
						className={classes.submit}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={sendInvite}
						disabled={!valid}
					>
						Invite
					</Button>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						href="/join"
					>
						Join IndSCA
					</Button>
					<Divider />
					<Button
						className={classes.submit}
						fullWidth
						variant="outlined"
						onClick={() => auth().signOut()}
					>
						Sign Out
					</Button>
				</form>
			)}
		</div>
	);
};

export default Invite;
