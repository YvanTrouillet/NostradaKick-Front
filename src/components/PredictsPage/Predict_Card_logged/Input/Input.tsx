import "./Input.scss";
import iconEdit from "../../../../assets/PredictPage/pen_edit.svg";

interface InputProps {
	name: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, value = "", onChange }: InputProps) => {
	// Bloquer les inputs
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Autoriser uniquement les touches numériques et quelques touches spéciales
		if (
			!/[0-9]/.test(event.key) && // Bloque tout sauf les chiffres
			event.key !== "Backspace" // Autorise la touche "Effacer"
		) {
			event.preventDefault(); // Empêche la saisie des caractères non autorisés
		}
	};

	return (
		<div className="predictCard__containerPredict__input">
			<input
				type="text"
				className="predictCard__containerPredict__input__score"
				name={name}
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyDown}
				maxLength={2}
			/>
		</div>
	);
};

export default Input;
