const { admin } = require("./admin");
const {
	MAIN_FEATURED_POST,
	MFP_DOC,
	FEATURED_POST,
} = require("./adminConstants");
const db = admin.firestore();

// Data
const { mainFeaturedPost } = require("./data/mainFeaturePost");
const { featuredPosts } = require("./data/featuredPosts");

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

const updateFeaturedPosts = async (post, index) => {
	const featPostRef = db.collection(FEATURED_POST).doc(`${index}`);

	if (post) {
		post.index = index;
		post.type = "recent";
		await featPostRef
			.set(post)
			.then(() => console.log("Done uploading post"))
			.catch((e) => console.log("featuredPost update error", e));
	} else {
		console.log("Failed to upload post");
	}
};

const main = async () => {
	// updateMainFeaturedPost(mainFeaturedPost);
	featuredPosts.map((post, i) => {
		updateFeaturedPosts(post, i);
	});
};

main();
