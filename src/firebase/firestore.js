import { db } from "./firebase";

const {
	MAIN_FEATURED_POST,
	FEATURED_POSTS,
} = require("../admin/adminConstants");

export const mainFeaturedPostQuery = db
	.collection(MAIN_FEATURED_POST)
	.where("type", "==", "default");

export const featuredPostQuery = db
	.collection(FEATURED_POSTS)
	.orderBy("index")
	.startAt(0);
