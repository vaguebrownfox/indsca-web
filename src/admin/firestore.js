const { admin } = require("./admin");
const {
	MAIN_FEATURED_POST,
	MFP_DOC,
	FEATURED_POSTS,
	HOME_CONTENT,
} = require("./adminConstants");
const db = admin.firestore();

// Data
const { mainFeaturedPost } = require("./data/mainFeaturePost");
const { featuredPosts } = require("./data/featuredPosts");
const { contents } = require("./data/homeContent");

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
	const featPostRef = db.collection(FEATURED_POSTS).doc(`${index}`);

	if (post) {
		post.index = index;
		await featPostRef
			.set(post)
			.then(() => console.log("Done uploading post ::", index))
			.catch((e) => console.log("featuredPost update error", index, e));
	} else {
		console.log("Failed to upload post :: post undefined", index);
	}
};

const updateHomeContent = async (content, index) => {
	const contentRef = db.collection(HOME_CONTENT).doc(`${index}`);

	if (content) {
		content.index = index;
		await contentRef
			.set(content)
			.then(() => console.log("Done uploading content ::", index))
			.catch((e) => console.log("content update error", index, e));
	} else {
		console.log("Failed to upload content :: content undefined", index);
	}
};

const main = async () => {
	updateMainFeaturedPost(mainFeaturedPost);
	featuredPosts.map((post, i) => {
		updateFeaturedPosts(post, i);
	});
	contents.map((content, i) => {
		updateHomeContent(content, i);
	});
};

main();
