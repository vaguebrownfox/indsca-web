import React, { useState, useRef, useEffect } from "react";
import emailRx from "email-regex";
import { signInWithEmailID, getVerifier } from "../../firebase/auth";
import { getInviteRef, setGetInvite } from "../../firebase/firestore";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, FormHelperText, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	mainpaper: {
		display: "flex",
		backgroundColor: theme.palette.grey[200],
		height: "100%",
		minHeight: "70vh",
		padding: theme.spacing(2),
		margin: theme.spacing(4),
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.text.secondary,
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	checkIcon: {
		height: theme.spacing(4),
		width: theme.spacing(4),
	},
	submit: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(2),
	},
	getinvite: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	links: {
		"&:focus, &:visited, &:link, &:active": {
			textDecoration: "none",
			color: theme.palette.primary.main,
		},
		"&:hover": {
			color: theme.palette.secondary.main,
		},
	},
	info: {
		margin: theme.spacing(1),
		color: theme.palette.error,
		fontSize: "0.77em",
	},

	menuPaper: {
		minHeight: 120,
		opacity: 0,
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
}));

const SignUp = () => {
	const [recaptcha, setRecaptcha] = useState();
	const element = useRef(null);

	useEffect(() => {
		if (!recaptcha) {
			const verifier = getVerifier(element.current);

			verifier.verify().then(() => setRecaptcha(verifier));
		}
	});

	return (
		<div>
			{recaptcha ? (
				<SignUpComponent />
			) : (
				<>
					<div>
						<CircularProgress color="secondary" size={28} />
					</div>
					<Typography variant="caption">
						Setting up authentication, please wait...
					</Typography>
				</>
			)}
			<div ref={element}></div>
		</div>
	);
};

const SignUpComponent = () => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [invited, setInvited] = useState(false);
	const [getInvited, setGetInvited] = useState(false);
	const [linkSent, setLinkSent] = useState(false);

	useEffect(() => {
		if (emailRx().test(email)) {
			const inviteRef = getInviteRef(email);

			inviteRef.get().then(({ exists }) => {
				console.log("exists: ", exists);
				setInvited(exists);
			});
		} else {
			setInvited(false);
		}
	}, [email]);

	const submitHelper = () => {
		signInWithEmailID(email).then((res) => {
			setLinkSent(res);
		});
	};

	const handleGetInvite = () => {
		setGetInvite(name, email).then(() => setGetInvited(true));
	};

	return (
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign In
			</Typography>

			<form
				className={classes.form}
				noValidate
				onSubmit={(e) => e.preventDefault()}
			>
				<Grid container spacing={1} justify="center">
					<Grid item xs={8}>
						<TextField
							required
							fullWidth
							id="email"
							label="Email ID"
							name="emailId"
							autoComplete="email"
							value={email}
							error={!invited && email.length > 0}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<FormHelperText error={!invited && email.length > 0}>
						{email.length > 0
							? invited
								? "This email ID is in invite list!"
								: "This email ID not in the invite list, get invited!"
							: "Enter the email you've been invited with..."}
					</FormHelperText>
				</Grid>

				{!invited && emailRx().test(email) && (
					<>
						<Grid
							className={classes.divider}
							container
							spacing={1}
							justify="center"
						>
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
						</Grid>
						<Button
							variant="contained"
							color="secondary"
							className={classes.getinvite}
							onClick={handleGetInvite}
							disabled={getInvited}
						>
							Get Invited
						</Button>
						{getInvited && (
							<Typography variant="caption" gutterBottom>
								You will soon receive an email from IndSCA to{" "}
								<b>{email}</b>
							</Typography>
						)}
					</>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={submitHelper}
					disabled={!invited || linkSent}
				>
					{!linkSent ? "Sign Up" : "Check your inbox!"}
				</Button>
				{linkSent && (
					<Typography variant="caption" gutterBottom>
						You'll receive an email to <b>{email}</b>, follow the
						link to finish signing up!
					</Typography>
				)}
			</form>
		</div>
	);
};

export default SignUp;
