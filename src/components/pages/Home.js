import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import {
	mainFeaturedPostQuery,
	featuredPostQuery,
} from "../../firebase/firestore";

import MainFeaturedPost from "../pieces/MainFeaturedPost";
import FeaturedPosts from "../pieces/FeaturedPosts";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import FeaturedPost from "./FeaturedPost";
// import Main from "./Main";
// import Sidebar from "./Sidebar";

// const mainFeaturedPost = {
// 	title: "Launching IndSCA",
// 	description:
// 		"Welcome to IndSCA! Your one stop to explore speech research highway in India.",
// 	image: "https://source.unsplash.com/random",
// 	imageText: "main image description",
// 	linkText: "Join IndSCA Today",
// };

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
	},
}));

const Home = () => {
	const classes = useStyles();
	const [mainFeaturedPost] = useCollectionData(mainFeaturedPostQuery);
	const [featuredPosts] = useCollectionData(featuredPostQuery);
	return (
		<div>
			{mainFeaturedPost && (
				<MainFeaturedPost post={mainFeaturedPost[0]} />
			)}
			{featuredPosts && (
				<Grid container spacing={4}>
					{featuredPosts.map((post) => (
						<Grid item xs={12} md={6}>
							<FeaturedPosts key={post.title} post={post} />
						</Grid>
					))}
				</Grid>
			)}
			{/* <Grid container spacing={5} className={classes.mainGrid}>
				<Main title="Events" posts={postsImp} />
				<Sidebar
					title={sidebar.title}
					description={sidebar.description}
					archives={sidebar.archives}
					social={sidebar.social}
				/>
			</Grid> */}
		</div>
	);
};

export default Home;
