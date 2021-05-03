import React, { useState, useRef, useEffect } from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
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
			{recaptcha && <SignUpComponent recaptcha={recaptcha} />}
			<div ref={element}></div>
		</div>
	);
};

const SignUpComponent = ({ recaptcha }) => {
	const [digits, setDigits] = useState("");
	const [invited, setInvited] = useState(false);
	const [memberType, setMemberType] = useState("");
	const [confirmationResult, setConfirmationResult] = useState(null);
	const [code, setCode] = useState("");

	const phoneNumber = `+91${digits}`;

	useEffect(() => {
		if (phoneNumber.length === 13) {
			const ref = db.collection("invites").doc(phoneNumber);
			db.collection("invites").get();
			ref.get().then(({ exists }) => {
				console.log("exists: ", exists);
				setInvited(exists);
			});
		} else {
			setInvited(false);
		}
		console.log("invite: ", phoneNumber, phoneNumber.length);
	}, [phoneNumber]);

	const signInWithPhoneNumber = async () => {
		setConfirmationResult(
			await auth()
				.signInWithPhoneNumber(phoneNumber, recaptcha)
				.catch((error) => {
					console.log("auth error: ", error);
					alert(error.message);
					return false;
				})
		);
	};

	// Step 3 - Verify SMS code
	const verifyCode = async () => {
		const result = await confirmationResult.confirm(code);
		console.log(result.user);
	};

	const submitHelper = () => {
		if (confirmationResult) {
			verifyCode();
		} else {
			signInWithPhoneNumber();
		}
	};
	const classes = useStyles();
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
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="phone"
							label="Phone Number (+91)"
							name="phoneNumber"
							autoComplete="phoneNumber"
							onChange={(e) => setDigits(e.target.value)}
						/>
					</Grid>
				</Grid>

				<p className={classes.info} component="body2" variant="body2">
					{invited
						? "This number is in invite list!"
						: "This number not in the invite list"}
				</p>

				{confirmationResult && (
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="confirmCode"
								label="Verify Code"
								name="confirmCode"
								autoComplete="confirmCode"
								onChange={(e) => setCode(e.target.value)}
							/>
						</Grid>
					</Grid>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={submitHelper}
				>
					{!confirmationResult ? "Sign Up" : "Verify"}
				</Button>
			</form>
		</div>
	);
};

export default SignUp;
