import "./Search.scss";

interface SearchProps {
	filteredValue: string;
	setFilteredValue: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
}

export const Search = ({ className, filteredValue, setFilteredValue }: SearchProps) => {



	return (
		<form className={`search__form ${className}`}> 
			<input
				type="text"
				id="search"
				placeholder="Rechercher..."
				// Champ contrôlé afin d'afficher le filtre en temps réel 
				value={filteredValue}
				onChange={(eventChange) => {
					setFilteredValue(eventChange.currentTarget.value);
				}}
				className="search__form__input"
			/>
		</form>
	);
};
