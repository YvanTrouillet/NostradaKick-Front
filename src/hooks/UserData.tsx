import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { apiRequest } from "../components/utils/api";

export const useUserData = () => {
	const [user, setUser] = useState<IUser>();

	useEffect(() => {
		// Ajout d'un flag pour éviter les appels multiples
		let isMounted = true;

		const getUserData = async () => {
			try {
				const token = localStorage.getItem("jwt");

				if (!token) {
					throw new Error("Le Token n'a pas été trouvé");
				}
				const res = await apiRequest("/users/profil", "GET")

				// Vérifier si le composant est toujours monté
				if (isMounted) {
					setUser(res);
					// Déplacer le console.log ici pour voir uniquement les données reçues
				}
			} catch (error) {
				console.error(error);
			}
		};
		getUserData();
		// Nettoie la fonction
		return () => {
			isMounted = false;
		};
	}, []);

	return { user };
};
