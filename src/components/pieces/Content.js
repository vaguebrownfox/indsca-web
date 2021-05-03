import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Markdown from "./Markdown";

const useStyles = makeStyles((theme) => ({
	markdown: {
		...theme.typography.body2,
		padding: theme.spacing(3, 0),
		marginLeft: theme.spacing(2),
	},
}));

const Content = (props) => {
	const classes = useStyles();
	const { posts: postsContent, title } = props;

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		Promise.all(
			postsContent.map((content) =>
				fetch(content.link)
					.then((res) => res.text())
					.then((text) => {
						return { key: content.index, text };
					})
			)
		).then((members) => {
			console.log("promise", members);
			setPosts(members);
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	console.log("Main.js", posts);

	return (
		<>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			<Divider />
			{posts.map((post) => (
				<Markdown className={classes.markdown} key={post.key}>
					{post.text}
				</Markdown>
			))}
		</>
	);
};

Content.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	title: PropTypes.string.isRequired,
};

export default Content;
