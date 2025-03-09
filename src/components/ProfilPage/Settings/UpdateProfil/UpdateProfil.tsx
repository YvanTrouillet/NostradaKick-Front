import { useUserData } from "../../../../hooks/UserData";
import "./UpdateProfil.scss";
import iconEdit from "../../../../assets/PredictPage/pen_edit.svg";
import { useState } from "react";
import { apiRequest } from "../../../utils/api";
import Dialog from "../Dialog/Dialog";

interface IPropsPatch {
	first_name: string;
	last_name: string;
	pseudo: string;
	email: string;
	password: string;
}

const UpdateProfil = () => {
	const { user } = useUserData();

	const [inputFirstName, setInputFirstName] = useState(user?.first_name);
	const [inputLaststName, setInputLastName] = useState(user?.last_name);
	const [inputPseudo, setInputPseudo] = useState(user?.pseudo);

	const [dataPatch, setDataPatch] = useState<IPropsPatch>();

	const [isOpen, setIsOpen] = useState(false);

	const patchUpdateProfil = async (data: IPropsPatch) => {
		try {
			const patchProfil = await apiRequest("/users/patch", "PATCH", data);
			console.log(patchProfil);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateProfil = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsOpen(true);
		const myFormData = new FormData(e.currentTarget);
		if (!user) return;
		const newUser = {
			first_name: myFormData.get("Firstname") as string,
			last_name: myFormData.get("Lastname") as string,
			pseudo: myFormData.get("Pseudo") as string,
			email: user?.email,
			password: "",
		};

		setDataPatch(newUser);
	};

	const handlePassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsOpen(false);
		const myFormData = new FormData(e.currentTarget);
		const newPassword = myFormData.get("password") as string;
		const newProfil = {
			...dataPatch,
			password: newPassword,
		} as IPropsPatch;
		patchUpdateProfil(newProfil);
	};

	return (
		<div className="updateProfil">
			<form
				action=""
				className="updateProfil__form"
				onSubmit={handleUpdateProfil}
			>
				<label htmlFor="Firstname">Prénom</label>
				<input
					type="text"
					name="Firstname"
					id="Firstname"
					value={inputFirstName}
					onChange={(e) => setInputFirstName(e.target.value)}
				/>

				<label htmlFor="Lastname">Nom</label>
				<input
					type="text"
					name="Lastname"
					id="Lastname"
					value={inputLaststName}
					onChange={(e) => setInputLastName(e.target.value)}
				/>

				<label htmlFor="Pseudo">Pseudo</label>
				<input
					type="text"
					name="Pseudo"
					id="Pseudo"
					value={inputPseudo}
					onChange={(e) => setInputPseudo(e.target.value)}
				/>

				<button type="submit">Enregistrer</button>
			</form>
			<div className="updateProfil__photo">
				<img
					src={user?.picture}
					alt=""
					className="updateProfil__photo__profil"
				/>
				<img src={iconEdit} alt="" className="updateProfil__photo__edit" />
			</div>
			<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<form onSubmit={handlePassword} className="dialog__form">
					<label htmlFor="password" className="dialog__form__label">
						Veuillez saisir votre mot de passe pour valider les modifications
						apportées a votre compte
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="dialog__form__input"
					/>
					<button type="submit" className="dialog__form__btn">
						envoyer
					</button>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						onKeyDown={() => setIsOpen(false)}
						className="dialog__form__btnClose"
					>
						X
					</button>
				</form>
			</Dialog>
		</div>
	);
};

export default UpdateProfil;
