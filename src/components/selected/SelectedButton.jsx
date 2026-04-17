export function SelectedButton({ selectedButtonName, onClickRemove, backendTable }) {
	return (
		<div className="selected-button">
			{selectedButtonName}
				<button
					className="remove-button"
					onClick={() => onClickRemove(selectedButtonName, backendTable)}
				>
						X
				</button>
		</div>
	)
}
