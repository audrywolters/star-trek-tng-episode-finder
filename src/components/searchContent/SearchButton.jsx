export function SearchButton({ button, onButtonClick}) {
	return (
		<button
			className="search-button"
			onClick={() => onButtonClick(button)}
		>
			{button.name}
		</button>
	)
}
