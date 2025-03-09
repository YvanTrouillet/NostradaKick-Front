import { useUserData } from "../../../../hooks/UserData";
import "./UpdatePassword.scss";
import { useState } from "react";
import { apiRequest } from "../../../utils/api";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

interface IPropsPatchPassword {
	pseudo: string;
	email: string;
	password: string;
}

const UpdatePassword = () => {
	const { user } = useUserData();

	if (!user) return;
	const inputPseudo = user?.pseudo;
	const inputEmail = user?.email;
	const [inputPassword, setInputPassword] = useState(user?.password);
	const [inputNewPassword, setInputNewPassword] = useState("");
	const [inputNewPasswordValidation, setInputNewPasswordValidation] =
		useState("");

	const [visiblePassword, setVisiblePassword] = useState("");

	const updateNotification = () =>
		toast.success("Votre mot de passe à bien été modifié!", {
			className: "creationUserToast",
			autoClose: 975,
		});
	const updateFailNotification = () =>
		toast.success("Mot de passe incorrect!", {
			className: "creationUserToast",
			autoClose: 975,
		});

	const patchUpdatePassword = async (data: IPropsPatchPassword) => {
		try {
			const patchProfil = await apiRequest("/users/patch", "PATCH", data);
			console.log(patchProfil);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const myFormData = new FormData(e.currentTarget);
		if (
			myFormData.get("NewPassword") === myFormData.get("NewPasswordValidation")
		) {
			const newUser = {
				pseudo: inputPseudo,
				email: inputEmail,
				password: myFormData.get("NewPassword") as string,
			};

			patchUpdatePassword(newUser);
			updateNotification();
		}
		updateFailNotification();
	};

	return (
		<div className="updatePassword">
			<form
				action=""
				className="updatePassword__form"
				onSubmit={handleUpdatePassword}
			>
				<div>
					<label htmlFor="Firstname">Mot de passe</label>
					<input
						type={visiblePassword === "Password" ? "text" : "password"}
						name="Password"
						id="Password"
						value={inputPassword}
						onChange={(e) => setInputPassword(e.target.value)}
					/>
					<button
						type="button"
						className="btn__showPassword"
						onClick={() =>
							setVisiblePassword(
								visiblePassword !== "Password" ? "Password" : "",
							)
						}
					>
						<div className="eyesButton">
							{visiblePassword === "Password" ? <FaEyeSlash /> : <IoEyeSharp />}
						</div>
					</button>
				</div>

				<div>
					<label htmlFor="Lastname">Nouveau mot de passe</label>
					<input
						type={visiblePassword === "newPassword" ? "text" : "password"}
						name="NewPassword"
						id="NewPassword"
						value={inputNewPassword}
						onChange={(e) => setInputNewPassword(e.target.value)}
					/>
					<button
						type="button"
						className="btn__showNewPassword"
						onClick={() =>
							setVisiblePassword(
								visiblePassword !== "newPassword" ? "newPassword" : "",
							)
						}
					>
						<div className="eyesButton">
							{visiblePassword === "newPassword" ? (
								<FaEyeSlash />
							) : (
								<IoEyeSharp />
							)}
						</div>
					</button>
				</div>

				<div>
					<label htmlFor="Pseudo">Confirmation du nouveau mot de passe</label>
					<input
						type={
							visiblePassword === "ValidationPassword" ? "text" : "password"
						}
						name="NewPasswordValidation"
						id="NewPasswordValidation"
						value={inputNewPasswordValidation}
						onChange={(e) => setInputNewPasswordValidation(e.target.value)}
					/>
					<button
						type="button"
						className="btn__showValidationPassword"
						onClick={() =>
							setVisiblePassword(
								visiblePassword !== "ValidationPassword"
									? "ValidationPassword"
									: "",
							)
						}
					>
						<div className="eyesButton">
							{visiblePassword === "ValidationPassword" ? (
								<FaEyeSlash />
							) : (
								<IoEyeSharp />
							)}
						</div>
					</button>
				</div>

				<button type="submit">Enregistrer</button>
			</form>
		</div>
	);
};

export default UpdatePassword;
