import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

function Copyright({ tag }) {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link
				style={{ textDecoration: "none", color: "#333" }}
				color="textSecondary"
				to="/"
			>
				{tag}
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	footer: {
		position: "relative",
		backgroundColor: theme.palette.grey[300],
		padding: theme.spacing(6, 0),
		marginTop: theme.spacing(4),
		width: "100%",
	},
}));

function Footer(props) {
	const classes = useStyles();
	const { description, title } = props;

	return (
		<footer className={classes.footer}>
			<Container maxWidth="lg">
				<Typography variant="h6" align="center" gutterBottom>
					{title}
				</Typography>
				<Typography
					variant="subtitle1"
					align="center"
					color="textSecondary"
					component="p"
				>
					{description}
				</Typography>
				<Copyright tag={title} />
			</Container>
		</footer>
	);
}

Footer.propTypes = {
	description: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Footer;
