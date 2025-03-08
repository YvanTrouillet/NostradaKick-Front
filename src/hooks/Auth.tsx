import { useState, useEffect } from "react";
import { apiRequest } from "../components/utils/api";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const res = await apiRequest('/auth/check', 'GET');

				if (res) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	return { isAuthenticated, loading };
};

export default useAuth;
