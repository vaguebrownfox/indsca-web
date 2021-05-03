import * as React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import TwitterHandle from "./TwitterHandle";

const useStyles = makeStyles((theme) => ({
	sidebarAboutBox: {
		padding: theme.spacing(4),
		margin: theme.spacing(2),
		backgroundColor: theme.palette.grey[200],
	},
	sidebarSection: {
		margin: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		marginTop: theme.spacing(3),
	},
	sidebarProfile: {
		padding: theme.spacing(4),
		margin: theme.spacing(2),
		backgroundColor: theme.palette.grey[200],
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: `24px auto`,
	},
}));

function Sidebar(props) {
	const classes = useStyles();
	const { archives, social } = props;

	return (
		<>
			<TwitterHandle />
			<Typography
				variant="h6"
				gutterBottom
				className={classes.sidebarSection}
			>
				Opportunities
			</Typography>
			<div className={classes.sidebarAboutBox}>
				{archives.map((archive) => (
					<Link
						display="block"
						variant="body1"
						href={archive.url}
						key={archive.title}
					>
						{archive.title}
					</Link>
				))}
			</div>

			<Typography
				variant="h6"
				gutterBottom
				className={classes.sidebarSection}
			>
				Social
			</Typography>
			<div className={classes.sidebarAboutBox}>
				{social.map((network) => (
					<Link
						display="block"
						variant="body1"
						href={network.link}
						key={network.name}
					>
						<Grid
							container
							direction="row"
							spacing={1}
							alignItems="center"
						>
							<Grid item>
								<network.icon />
							</Grid>
							<Grid item>{network.name}</Grid>
						</Grid>
					</Link>
				))}
			</div>
		</>
	);
}

Sidebar.propTypes = {
	archives: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	description: PropTypes.string.isRequired,
	social: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.elementType.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	title: PropTypes.string.isRequired,
};

export default Sidebar;
