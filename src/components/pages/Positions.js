import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, CardActions, CardMedia, Avatar } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		backgroundColor: theme.palette.grey[200],
		height: "100%",
		minHeight: "70vh",
		padding: theme.spacing(4),
		margin: theme.spacing(4),
		color: theme.palette.text.secondary,
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

const getPositions = () => {
	const positions = [
		{
			name: "Jeevan K",
			position: "Project Personnel, SPIRE Lab, IISc Bangalore",
			affliation: "Volunteer",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/indsca-base.appspot.com/o/positions%2Fphotos%2Fjk.jpeg?alt=media&token=f8f54968-5b47-4ba5-af9a-e3d09deeab91",
		},
		{
			name: "Shaique Solanki",
			position: "Project Personnel, SPIRE Lab, IISc Bangalore",
			affliation: "Volunteer",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/indsca-base.appspot.com/o/positions%2Fphotos%2Fshaique_s.jpg?alt=media&token=6b08e9ed-cb53-4ddd-8262-019f7c54da21",
		},
		{
			name: "Tilak Purohit",
			position: "Project Personnel, SPIRE Lab, IISc Bangalore",
			affliation: "Volunteer",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/indsca-base.appspot.com/o/positions%2Fphotos%2Ftilak_p.jpg?alt=media&token=f71c6162-8fe2-41da-9d44-7a280090b0ab",
		},
	];

	return positions;
};

const Positions = () => {
	const classes = useStyles();

	const positions = getPositions();

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Grid container spacing={3}>
							{positions.map((pos, i) => (
								<ProfileCard
									key={i}
									name={pos.name}
									position={pos.position}
									affliation={pos.affliation}
									imageLink={pos.imageLink}
								/>
							))}
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

const defaultImg =
	"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";

const ProfileCard = ({ name, position, affliation, imageLink }) => {
	const classes = useStyles();
	return (
		<Grid item lg={4} md={5} xs={12}>
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
		</Grid>
	);
};

export default Positions;
