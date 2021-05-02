import { db } from "./firebase";

const {
	MAIN_FEATURED_POST,
	FEATURED_POSTS,
	HOME_CONTENT,
	POSITION_INFO,
} = require("../admin/adminConstants");

export const mainFeaturedPostQuery = db
	.collection(MAIN_FEATURED_POST)
	.where("type", "==", "default");

export const featuredPostQuery = db
	.collection(FEATURED_POSTS)
	.orderBy("index")
	.startAt(0);

export const contentQuery = db
	.collection(HOME_CONTENT)
	.orderBy("index")
	.startAt(0);

export const positionQuery = db
	.collection(POSITION_INFO)
	.orderBy("index")
	.startAt(0);
