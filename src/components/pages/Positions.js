import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { positionQuery } from "../../firebase/firestore";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActions, Avatar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	paper: {
		height: "100%",
		minHeight: "70vh",
		margin: theme.spacing(1),
	},

	cardroot: {
		display: "flex",
		margin: 8,
	},
	details: {
		display: "flex",
		alignContent: "flex-start",
		flexDirection: "column",
		marginLeft: theme.spacing(1),
	},
	content: {
		flex: "1 0 auto",
		margin: theme.spacing(2),
	},
	cover: {
		width: 100,
		height: 100,
		borderRadius: theme.spacing(1),
		alignSelf: "center",
	},
	playIcon: {
		height: 38,
		width: 38,
	},
	cardactions: {
		flexDirection: "row",
		padding: 0,
		paddingTop: theme.spacing(2),
	},
	cardtext: {
		textAlign: "start",
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: theme.spacing(2),
	},
	card: {},
}));

const Positions = () => {
	const classes = useStyles();

	const [positions] = useCollectionData(positionQuery);

	return (
		<div className={classes.paper}>
			<Grid container spacing={3}>
				{positions &&
					positions.map((pos, i) => (
						<Grid item lg={4} md={5} xs={12}>
							<ProfileCard
								key={i}
								name={pos.name}
								position={pos.position}
								affliation={pos.affliation}
								imageLink={pos.imageLink}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	);
};

const defaultImg =
	"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";

const ProfileCard = ({ name, position, affliation, imageLink }) => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<Grid
				container
				spacing={1}
				alignItems="center"
				alignContent="center"
				justify="space-around"
			>
				<Grid item xs={4}>
					<Avatar
						alt="Remy Sharp"
						src={imageLink || defaultImg}
						className={classes.large}
					/>
				</Grid>
				<Grid item xs={8}>
					<CardContent className={classes.content}>
						<Typography
							className={classes.cardtext}
							component="div"
							variant="subtitle2"
						>
							{name}
						</Typography>
						<Typography
							className={classes.cardtext}
							component="div"
							variant="body2"
							color="textSecondary"
						>
							{position}
						</Typography>
						<CardActions className={classes.cardactions}>
							<Typography
								component="div"
								variant="caption"
								color="textSecondary"
							>
								{affliation}
							</Typography>
						</CardActions>
					</CardContent>
				</Grid>
			</Grid>
		</Card>
	);
};

export default Positions;
