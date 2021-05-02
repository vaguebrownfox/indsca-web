import React from "react";
import PropTypes from "prop-types";

// MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const SamplePiece = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<p>SamplePiece</p>
		</div>
	);
};

SamplePiece.propTypes = {
	somethings: PropTypes.shape({
		thing: PropTypes.string.isRequired,
	}),
};

export default SamplePiece;
