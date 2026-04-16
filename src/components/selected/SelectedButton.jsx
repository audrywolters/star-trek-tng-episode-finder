export function SelectedButton({ selectedButtonName }) {
	return (
		<div className="selected-button">
			{selectedButtonName}
				<button
					className="remove-button">
						X
				</button>
		</div>
	)
}
