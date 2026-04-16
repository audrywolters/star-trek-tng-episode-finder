export function SearchButton({ buttonName, onButtonClick}) {
	return (
		<button
			className="search-button"
			onClick={() => onButtonClick(buttonName)}
		>
			{buttonName}
		</button>
	)
}
