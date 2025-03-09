import { apiRequest } from "../../../utils/api";
import { useNavigate } from "react-router";
import "./DeleteProfil.scss";
import { toast } from "react-toastify";

export const DeleteProfil = () => {
	const navigate = useNavigate();

	const handleDeleteUser = async () => {
		const deleteUserToast = () =>
			toast.success("Nostradamus a supprimé votre compte", {
				className: "creationToast",
				autoClose: 2000,
				hideProgressBar: true,
			});
		try {
			await apiRequest("/users/delete", "DELETE");

			deleteUserToast();
			localStorage.removeItem("jwt");
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="deleteProfil">
				{/* <button type="button" className="deleteProfil__lock">
					Désactiver le compte
				</button> */}
				<button
					type="button"
					className="deleteProfil__delete"
					onClick={handleDeleteUser}
				>
					Supprimer le compte
				</button>
			</div>
		</>
	);
};
