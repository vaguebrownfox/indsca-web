import { db } from "./firebase";

const {
	MAIN_FEATURED_POST,
	FEATURED_POSTS,
	HOME_CONTENT,
	POSITION_INFO,
	MEMBERS,
	INVITES,
	GET_INVITES,
	LINKS,
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

export const invitesQuery = (id) =>
	db.collection(INVITES).where("sender", "==", id);

export const linkQuery = (id) =>
	db.collection(MEMBERS).doc(id).collection(LINKS).orderBy("type").startAt(0);

export const getInviteRef = (email) => db.collection(INVITES).doc(email);

export const setInvite = async (name, email, id) => {
	const inviteRef = db.collection(INVITES).doc(email);
	await inviteRef
		.set({
			name,
			email,
			sender: id,
		})
		.catch((e) => {
			console.log("firestore ::set invite error", e);
		});
};

export const setGetInvite = async (name, email, organisation) => {
	const getInviteRef = db.collection(GET_INVITES).doc(email);
	await getInviteRef
		.set({
			name,
			email,
			organisation,
		})
		.catch((e) => {
			console.log("firestore ::set get invite error", e);
		});
};

export const setLinks = async (id, type, link) => {
	const linkRef = db.collection(MEMBERS).doc(id).collection(LINKS).doc();
	await linkRef
		.set({
			id: linkRef.id,
			type,
			link,
		})
		.catch((e) => {
			console.log("firestore ::set invite error", e);
		});
};

export const removeLink = async (id, docId) => {
	const linkRef = db.collection(MEMBERS).doc(id).collection(LINKS).doc(docId);
	await linkRef.delete().catch((e) => {
		console.log("firestore ::set invite error", e);
	});
};

export const addMember = async (type, name, email, sheetId, sheetUrl) => {
	const memberRef = db.collection(MEMBERS).doc(email);
	await memberRef
		.set({
			name,
			email,
			type,
			sheetId,
			sheetUrl,
		})
		.catch((e) => {
			console.log("firestore ::add member error", e);
		});
};

export const getMember = async (email) => {
	const memberRef = db.collection("members").doc(email);
	const res = await memberRef
		.get()
		.then((snap) => {
			return snap;
		})
		.catch((e) => {
			console.log("firestore ::get member error", e);
			return null;
		});

	return res;
};
