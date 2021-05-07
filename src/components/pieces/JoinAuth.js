import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	CircularProgress,
	Divider,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import { addMember, getMember } from "../../firebase/firestore";

const memberTypes = [
	{
		tag: "professor",
		title: "Professor",
	},
];
const useStyles = makeStyles((theme) => ({
	root: {
		//
	},
	form: {
		width: "100%", // Fix IE 11 issue.
	},
	formControl: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(2),
		width: "100%",
		minWidth: theme.spacing(32),
	},
	textInput: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	buttons: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: theme.spacing(4, 0, 2),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
	link: {
		width: "100%",
		textTransform: "none",
	},
	msg: {
		minHeight: theme.spacing(2),
	},
}));

const JoinAuth = ({ email }) => {
	const classes = useStyles();
	const [memberType, setMemberType] = useState("");
	const [name, setName] = useState("");
	const [sheetUrl, setSheetUrl] = useState(null);
	const [msg, setMsg] = useState("");
	const [wait, setWait] = useState(false);

	const memberSumbit = () => {
		if (memberType.length < 1 && name.length < 1) {
			setMsg("Fill all the fields properly!");
			return;
		}
		setWait(true);
		axios({
			method: "post",
			url: "http://localhost:5001/indsca-prod/us-central1/api/folder",
			data: {
				folderName: name,
				email: email,
			},
		}).then((res) => {
			const sheetId = res.data.sheetId;
			const sheetUrl = res.data.sheetUrl;

			setSheetUrl(res.data.sheetUrl);

			addMember(memberType, name, email, sheetId, sheetUrl).then(() =>
				setWait(false)
			);
		});
	};

	useEffect(() => {
		getMember(email).then((snap) => {
			if (snap.exists) {
				const data = snap.data();

				setMemberType(data.type);
				setName(data.name);
				setSheetUrl(data.sheetUrl);

				console.log(snap.data());
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.root}>
			<Typography component="h1" variant="h5" gutterBottom>
				Become an IndSCA member
			</Typography>

			<Divider />
			<form
				className={classes.form}
				noValidate
				onSubmit={(e) => e.preventDefault()}
			>
				<FormControl className={classes.formControl}>
					<InputLabel id="select-label">Member Type</InputLabel>
					<Select
						required
						variant="standard"
						labelId="select-label"
						id="select"
						value={memberType}
						onChange={(e) => setMemberType(e.target.value)}
						MenuProps={{ classes: { paper: classes.menuPaper } }}
					>
						<MenuItem value="">
							<em>Select</em>
						</MenuItem>
						{memberTypes.map((m, i) => (
							<MenuItem key={i} value={m.tag}>
								{m.title}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<div>
					<TextField
						className={classes.textInput}
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						className={classes.textInput}
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						value={email}
						disabled
					/>
				</div>
				<FormHelperText className={classes.msg} component="div">
					{msg}
				</FormHelperText>
				<div className={classes.buttons}>
					{wait && <CircularProgress color="secondary" size={28} />}

					{sheetUrl ? (
						<Button
							className={classes.link}
							color="primary"
							variant="outlined"
							size="small"
							href={sheetUrl}
							target="_blank"
						>
							Go to your google sheet link
						</Button>
					) : (
						<Button
							className={classes.submit}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={memberSumbit}
							disabled={wait}
						>
							Submit
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default JoinAuth;
