import { useNavigate } from "react-router";
import logo from "../../assets/Header/Logo.svg";
import "./authentification.scss";
import { Link } from "react-router";
import { apiRequest } from "../utils/api";

export default function Auth() {
	const navigate = useNavigate();

	const loginFetch = async (user: { email: string; password: string }) => {
		try {
			// Login et récupération du Token JWT
			const data = await apiRequest("/signin", "POST", user);
			// Enregictrement du Token
			localStorage.setItem("jwt", data.token);

			// Redirection
			if (data.message === "Authentifié avec succès") {
				navigate("/predictions");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const HandleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const myFormData = new FormData(event.currentTarget);
		const userLogin = {
			email: myFormData.get("email") as string,
			password: myFormData.get("password") as string,
		};
		loginFetch(userLogin);
	};

	return (
		<div className="loginPage">
			<div className="loginPage__loginCard">
				<form onSubmit={HandleLogin}>
					<img src={logo} alt="Logo" className="loginPage__loginCard__logo" />

					<label>
						Email
						<div className="loginPage__loginCard__password">
							<input
								type="email"
								placeholder="email@nostradakick.fr"
								required
								name="email"
							/>
						</div>
					</label>

					<label>
						Mot de passe
						<div className="loginPage__loginCard__password">
							<input
								type="password"
								placeholder="Votre mot de passe"
								required
								name="password"
							/>
						</div>
					</label>

					<a href="/" className="loginPage__loginCard__forgotPassword">
						Mot de passe oublié
					</a>

					<button type="submit" className="loginPage__loginCard__loginButton">
						Se connecter
					</button>

					<a href="/signup" className="loginPage__loginCard__CreateAccount">
						Créer un compte
					</a>

					<p className="loginPage__loginCard__terms">
						En poursuivant, vous acceptez les conditions générales d'utilisation
						et reconnaissez avoir lu la politique de protection des données.
					</p>
				</form>
			</div>
			<Link to="/" className="loginPage__loginCard__linkToHome">
				{">"} Retour au vestiaire (Accueil)
			</Link>
		</div>
	);
}
