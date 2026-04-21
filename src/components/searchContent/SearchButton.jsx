export function SearchButton({ button, isSelected, onButtonClick}) {
	return (
		<button
			className={`search-button ${isSelected ? 'selected' : ''}`}
			disabled={isSelected}
			onClick={() => onButtonClick(button)}
		>
			{button.name}
		</button>
	)
}
