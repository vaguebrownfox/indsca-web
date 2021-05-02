const { admin } = require("./admin");
const { MAIN_FEATURED_POST, MFP_DOC } = require("./adminConstants");
const db = admin.firestore();

// Main feature post
const { mainFeaturedPost } = require("./data/mainFeaturePost");

const updateMainFeaturedPost = async (post) => {
	const mainFeatPostRef = db.collection(MAIN_FEATURED_POST).doc(MFP_DOC);

	if (post) {
		await mainFeatPostRef
			.set(post)
			.then(() => console.log("Done uploading post"))
			.catch((e) => console.log("mainFeaturedPost update error", e));
	} else {
		console.log("Failed to upload post");
	}
};

updateMainFeaturedPost(mainFeaturedPost);
