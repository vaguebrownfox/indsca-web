import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { linkQuery, setLinks, removeLink } from "../../firebase/firestore";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Chip, Grid, TextField, Typography } from "@material-ui/core";
import { Link as LinkIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {},
	list: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: "8px 0px",
	},
	listhead: {
		color: theme.palette.secondary.main,
		textAlign: "center",
		maxWidth: theme.spacing(32),
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	chips: {
		margin: 4,
	},
}));

const LinkList = ({ id }) => {
	const classes = useStyles();
	const [linkType, setLinkType] = useState("");
	const [link, setLink] = useState("");

	const [links] = useCollectionData(linkQuery(id));

	const handleAddLink = () => {
		setLinks(id, linkType, link);
		setLink("");
		setLinkType("");
	};

	const handleDelete = (docId) => {
		removeLink(id, docId);
	};

	return (
		<div className={classes.root}>
			<div className={classes.list}>
				<Typography
					className={classes.listhead}
					component="div"
					variant="caption"
					gutterBottom
				>
					Add important links for IndSCA to collect information about
					you. <br /> (e.g. CV, publications, courses etc.)
				</Typography>
				{links && (
					<>
						{links.length > 0 ? (
							links?.map((item, i) => (
								<Chip
									key={i}
									className={classes.chips}
									color="primary"
									icon={<LinkIcon />}
									label={
										<a
											href={item?.link}
											target="_blank"
											rel="noreferrer"
										>
											<b>{item?.type} </b>: {item?.link}
										</a>
									}
									onDelete={() => handleDelete(item?.id)}
								/>
							))
						) : (
							<Typography variant="caption">{`*No links added*`}</Typography>
						)}
					</>
				)}

				<form
					className={classes.form}
					noValidate
					onSubmit={(e) => e.preventDefault()}
				>
					<Grid container spacing={2} justify="center">
						<Grid item xs={6}>
							<TextField
								required
								id="type"
								label="Type"
								name="type"
								autoComplete="linktype"
								value={linkType}
								onChange={(e) => setLinkType(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								required
								id="link"
								label="Link"
								name="link"
								autoComplete="link"
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
						</Grid>
					</Grid>

					<Button
						className={classes.submit}
						fullWidth
						type="submit"
						size="small"
						variant="contained"
						color="secondary"
						onClick={handleAddLink}
						disabled={linkType === "" && link === ""}
					>
						Add
					</Button>
				</form>
			</div>
		</div>
	);
};

LinkList.propTypes = {
	id: PropTypes.string.isRequired,
};

export default LinkList;
