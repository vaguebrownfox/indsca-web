import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";

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
		marginBottom: theme.spacing(2),
		minWidth: theme.spacing(32),
	},
	submit: {
		margin: theme.spacing(8, 0, 2),
	},
}));

const JoinAuth = ({ email }) => {
	const classes = useStyles();
	const [memberType, setMemberType] = useState("");
	const [name, setName] = useState("");

	return (
		<div className={classes.root}>
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
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<Button
					className={classes.submit}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default JoinAuth;
