import { SelectedButton } from './SelectedButton'
import './Selected.css'

export function SelectedList({ selectedButtonList }) {

	return (
		<div className="selected-list">
			<h2>Selected</h2>

			{selectedButtonList.length > 0 ? (
				selectedButtonList.map((item) => (
					<SelectedButton
						key={`${item.type}-${item.name}`}
						selectedButtonName={item.name}
					/>
				))
			) : (
				<div>No buttons selected</div>
			)}
		</div>
	)
}