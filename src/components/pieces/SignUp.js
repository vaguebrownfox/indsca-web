import React, { useState, useRef, useEffect } from "react";
import emailRx from "email-regex";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, FormHelperText, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { auth, db } from "../../firebase/firebase";

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
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	checkIcon: {
		height: theme.spacing(4),
		width: theme.spacing(4),
	},
	submit: {
		marginTop: theme.spacing(4),
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
	formControl: {
		margin: theme.spacing(1),
		marginBottom: theme.spacing(2),
		minWidth: 120,
	},
	selectType: {},
	menuPaper: {
		minHeight: 120,
		opacity: 0,
	},
}));

const SignUp = () => {
	const [recaptcha, setRecaptcha] = useState(null);
	const element = useRef(null);

	useEffect(() => {
		if (!recaptcha) {
			const verifier = new auth.RecaptchaVerifier(element.current, {
				size: "invisible",
			});

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
	const [invited, setInvited] = useState(false);
	const [linkSent, setLinkSent] = useState(false);
	const [memberType, setMemberType] = useState("");

	useEffect(() => {
		if (emailRx().test(email)) {
			const ref = db.collection("invites").doc(email);

			ref.get().then(({ exists }) => {
				console.log("exists: ", exists);
				setInvited(exists);
			});
		} else {
			setInvited(false);
		}
	}, [email]);

	const signInWithEmailID = async () => {
		const actionCodeSettings = {
			url: `${window.location.href}?type=${memberType}`,
			handleCodeInApp: true,
		};
		await auth()
			.sendSignInLinkToEmail(email, actionCodeSettings)
			.then(() => {
				window.localStorage.setItem("emailForSignIn", email);
				setLinkSent(true);
			})
			.catch((e) => {
				console.log("indsca signup ::send link error", e);
				return false;
			});
	};

	const submitHelper = () => {
		signInWithEmailID();
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
				<FormControl className={classes.formControl}>
					<InputLabel id="select-label">Member Type</InputLabel>
					<Select
						variant="standard"
						labelId="select-label"
						id="select"
						value={memberType}
						onChange={(e) => setMemberType(e.target.value)}
						MenuProps={{ classes: { paper: classes.menuPaper } }}
						className={classes.selectType}
					>
						<MenuItem value="">
							<em>Select</em>
						</MenuItem>
						<MenuItem value={"professor"}>Professor</MenuItem>
						<MenuItem value={"member"}>Member Type</MenuItem>
					</Select>
				</FormControl>

				<Grid container spacing={1} justify="center">
					<Grid item xs={8}>
						<TextField
							required
							fullWidth
							id="email"
							label="Email ID"
							name="emailId"
							autoComplete="email"
							error={!invited && email.length > 0}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<FormHelperText error={!invited && email.length > 0}>
						{email.length > 0
							? invited
								? "This email ID is in invite list!"
								: "This email ID not in the invite list"
							: "Enter the email you've been invited with..."}
					</FormHelperText>
				</Grid>

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
			</form>
		</div>
	);
};

export default SignUp;
