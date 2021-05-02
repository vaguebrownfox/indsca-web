import { db } from "./firebase";

const { MAIN_FEATURED_POST } = require("../admin/adminConstants");

export const mainFeaturedPostQuery = db
	.collection(MAIN_FEATURED_POST)
	.where("type", "==", "default");
