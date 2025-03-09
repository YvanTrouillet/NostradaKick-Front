import { useEffect, useState } from "react";
import "./MyPredict.scss";
import { apiRequest } from "../../utils/api";
import MyPredictCard from "./MyPredictCard/MyPredictCard";
import { IMatch } from "../../../@types";
import { useUserData } from "../../../hooks/UserData";

const MyPredict = () => {
	const { user } = useUserData();
	const [matchs, setMatchs] = useState<IMatch[]>();

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const data = await apiRequest("/matchs", "GET");
				setMatchs(data);
			} catch (error) {
				console.log("erreur");
			}
		};
		fetchMatch();
	}, []);


	const scorePredict = matchs?.filter(
		(match) => {
			for (const predict of user?.prediction!) {
				return predict.match_id === match.match_id
			}
		}
	);

	if (!scorePredict) return null;
	
	const sortedMatchs = scorePredict?.sort((a, b) => a.date.localeCompare(b.date));


	return (
		<div className="myPredict">
			{sortedMatchs?.map((match) => (
				<MyPredictCard key={match.match_id} match={match} />
			))}
		</div>
	);
};

export default MyPredict;
