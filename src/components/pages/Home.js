import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import {
	mainFeaturedPostQuery,
	featuredPostQuery,
	contentQuery,
} from "../../firebase/firestore";

import MainFeaturedPost from "../pieces/MainFeaturedPost";
import FeaturedPosts from "../pieces/FeaturedPosts";
import Content from "../pieces/Content";
import Sidebar from "../pieces/Sidebar";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TwitterIcon from "@material-ui/icons/Twitter";
import { CircularProgress } from "@material-ui/core";

const sidebar = {
	title: "About IndSCA",
	description:
		"A Committee formed with distinguished faculty members from different institutions in the country. IndSCA is based in Bangalore. It aims to boost speech, language and audio research activity in India by supporting thriving souls in this field by means of providing travel grants to major international speech conferences [NIPS, ICML, Interspeech, ICASSP etc.], announce awards and much more!",
	archives: [
		{ title: "Internship - Speech Research", url: "#" },
		{ title: "ASR Challenge", url: "#" },
		{ title: "Volunteer for IndSCA", url: "#" },
	],
	social: [
		{
			name: "Twitter",
			link: `https://twitter.com/IndianSpeechCo1`,
			icon: TwitterIcon,
		},
	],
};

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	progress: {
		display: "flex",
		justifyContent: "center",
		alighItems: "center",
		paddingTop: theme.spacing(12),
		height: "100%",
		width: "100%",
	},
}));

const Home = () => {
	const classes = useStyles();
	const [mainFeaturedPost] = useCollectionData(mainFeaturedPostQuery);
	const [featuredPosts] = useCollectionData(featuredPostQuery);
	const [contents] = useCollectionData(contentQuery);

	return (
		<div>
			{mainFeaturedPost && (
				<MainFeaturedPost post={mainFeaturedPost[0]} />
			)}
			{featuredPosts && (
				<Grid container spacing={4} justify="center">
					{featuredPosts.map((post, i) => (
						<Grid key={i} item xs={12} sm={6} md={4}>
							<FeaturedPosts post={post} />
						</Grid>
					))}
				</Grid>
			)}
			<Grid container spacing={5} className={classes.mainGrid}>
				<Grid item xs={12} md={8}>
					{contents ? (
						<Content title="Events" posts={contents} />
					) : (
						<div className={classes.progress}>
							<CircularProgress color="secondary" size={48} />
						</div>
					)}
				</Grid>
				<Grid item xs={12} md={4}>
					<Sidebar
						title={sidebar.title}
						description={sidebar.description}
						archives={sidebar.archives}
						social={sidebar.social}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
