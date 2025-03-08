import { useEffect, useState } from "react";
import { IUser } from "../@types";

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
				const response = await fetch("http://localhost:3000/api/users/profil", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`, // Ajouter le token dans le header Authorization
					},
				});

				if (!response.ok) {
					throw new Error("Aucune donnée n'a été trouvée");
				}
				const data = await response.json();
				// Vérifier si le composant est toujours monté
				if (isMounted) {
					setUser(data);
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
