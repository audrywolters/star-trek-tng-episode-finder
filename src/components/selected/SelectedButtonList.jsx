import { SelectedButton } from './SelectedButton'
import './Selected.css'

export function SelectedButtonList({ selectedButtonList }) {

	return (
		<div className="selected-list">
			<h2>Selected</h2>
			
			{selectedButtonList.length > 0 ? (
				selectedButtonList.map((button) => (
					<SelectedButton
						key={`${button.name}-${button.backendTable}`}
						selectedButtonName={button.name}
					/>
				))
			) : (
				<div>No buttons selected</div>
			)}
		</div>
	)
}