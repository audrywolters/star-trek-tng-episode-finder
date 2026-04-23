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
						button={button}
						onClickRemove={onClickRemove}
					/>
				))
			) : (
				<div>No buttons selected</div>
			)}
		</div>
	)
}