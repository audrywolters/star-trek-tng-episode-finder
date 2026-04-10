

export function SelectedButton({ selectedButtonName, index }) {
	return (
		<div 
			className="selected-button"
			key={index}>
			{selectedButtonName}
				<button
					className="remove-button">
						X
				</button>
		</div>
	)
}