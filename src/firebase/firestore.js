import { db } from "./firebase";

const {
	MAIN_FEATURED_POST,
	FEATURED_POST,
} = require("../admin/adminConstants");

export const mainFeaturedPostQuery = db
	.collection(MAIN_FEATURED_POST)
	.where("type", "==", "default");

export const featuredPostQuery = db
	.collection(FEATURED_POST)
	.where("type", "==", "recent");
