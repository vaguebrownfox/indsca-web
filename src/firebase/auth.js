import { auth } from "./firebase";

export const signInWithEmailID = async (email) => {
	const actionCodeSettings = {
		url: `${window.location.href}`,
		handleCodeInApp: true,
	};
	const res = await auth()
		.sendSignInLinkToEmail(email, actionCodeSettings)
		.then(() => {
			window.localStorage.setItem("emailForSignIn", email);
			return true;
		})
		.catch((e) => {
			console.log("indsca signup ::send link error", e);
			return false;
		});

	return res;
};

export const getVerifier = (element) =>
	new auth.RecaptchaVerifier(element, {
		size: "invisible",
	});
