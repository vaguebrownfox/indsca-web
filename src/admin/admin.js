var admin = require("firebase-admin");

var serviceAccount = require("./firebaseAdminConfig.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: this.DATABASE_URL,
});

exports.admin = admin;
