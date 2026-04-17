import { SelectedButton } from './SelectedButton'
import './SelectedButtonList.css'

export function SelectedButtonList({ selectedButtonList, onClickRemove }) {
	return (
		<div className="selected-list">
			<h2>Selected</h2>
	
			{selectedButtonList.length > 0 ? (
				selectedButtonList.map((button) => (
					<SelectedButton
						key={`${button.id}-${button.name}`}
						selectedButtonName={button.name}
						backendTable={button.backendTable}
						onClickRemove={onClickRemove}
					/>
				))
			) : (
				<div>No buttons selected</div>
			)}
		</div>
	)
}