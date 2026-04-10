import { SelectedButton } from './SelectedButton'
import './Selected.css'

export function SelectedList({ selectedButtonList }) {

	// Check if there are any selected buttons (characters or genres)
    const hasSelectedButtons = selectedButtonList.characters.length > 0 || selectedButtonList.genres.length > 0;

	return (
		<div className="selected-list">
			<h2>Selected</h2>
			{hasSelectedButtons ? (
				<>
					{selectedButtonList.characters.map((character, index) => (
							<SelectedButton 
								key={index}
								selectedButtonName={character} 
							/>
						))}

						{selectedButtonList.genres.map((genre, index) => (
							<SelectedButton 
								key={index}
								selectedButtonName={genre} 
							/>
						))}
				</>
			) : (
				<div>No buttons selected</div>
			)}
		</div>
	)
}