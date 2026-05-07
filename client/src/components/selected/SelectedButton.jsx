export function SelectedButton({ button, onClickRemove }) {
	return (
		<div className="selected-button">
			{button.name}
				<button
					className="remove-button"
					onClick={() => onClickRemove(button.id, button.filterType)}
				>
						X
				</button>
		</div>
	)
}
