import React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: "space-between",
		overflowX: "auto",
		textDecoration: "none",
	},
	toolbarLink: {
		textDecoration: "none",
		padding: theme.spacing(1),
		flexShrink: 0,
		fontSize: "14px",
		color: theme.palette.grey[900],
	},
	links: {
		textDecoration: "none",
	},
}));

const Header = (props) => {
	const classes = useStyles();
	const { sections, title } = props;
	// const [user] = useAuthState(auth());

	return (
		<>
			<Toolbar className={classes.toolbar}>
				<Link className={classes.toolbarSecondary} to="/">
					<Button size="small">IndSCA</Button>
				</Link>
				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					noWrap
					className={classes.toolbarTitle}
				>
					{title}
				</Typography>
				{/* <Link className={classes.links} to="/signup">
					<Button variant="outlined" size="small">
						{user ? "Invite" : "Sign In"}
					</Button>
				</Link> */}
				<Button variant="outlined" size="small">
					{"Sign In"}
				</Button>
			</Toolbar>
			<Toolbar
				component="nav"
				variant="dense"
				className={classes.toolbarSecondary}
			>
				{sections.map((section) => (
					<Link
						color="inherit"
						key={section.title}
						variant="body2"
						to={section.url}
						className={classes.toolbarLink}
					>
						{section.title}
					</Link>
				))}
			</Toolbar>
		</>
	);
};

Header.propTypes = {
	sections: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	title: PropTypes.string.isRequired,
};

export default Header;
