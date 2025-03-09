import { useState } from "react";
import { DeleteProfil } from "./DeleteProfil/DeleteProfil";
import "./Settings.scss";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import UpdateProfil from "./UpdateProfil/UpdateProfil";

export default function Settings() {
	const [actived, setActived] = useState("updateProfil");

	return (
		<div className="settings">
			<ul className="settings__list">
				<li
					className="settings__list__item"
					onClick={() => setActived("updateProfil")}
					onKeyDown={() => setActived("updateProfil")}
				>
					Changer mon profil
					{actived === "updateProfil" && <p>{">"}</p>}
				</li>
				<li
					className="settings__list__item"
					onClick={() => setActived("updatePassword")}
					onKeyDown={() => setActived("updatePassword")}
				>
					Changer mon mot de passe
					{actived === "updatePassword" && <p>{">"}</p>}
				</li>
				<li
					className="settings__list__item"
					onClick={() => setActived("deleteProfil")}
					onKeyDown={() => setActived("deleteProfil")}
				>
					Supprimer mon compte
					{actived === "deleteProfil" && <p>{">"}</p>}
				</li>
			</ul>
			{actived === "updateProfil" && <UpdateProfil />}
			{actived === "updatePassword" && <UpdatePassword />}
			{actived === "deleteProfil" && <DeleteProfil />}
		</div>
	);
}
