import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: "By far my favorite service! Will definitely be using again and will recommend to my friends.",
			rating: 10,
		},
		{
			id: 2,
			text: "The service was excellent",
			rating: 9,
		},
		{
			id: 3,
			text: "It was everything I wanted and more ;)",
			rating: 10,
		},
		{
			id: 4,
			text: "so-so service. Perhaps the owner was too busy today.",
			rating: 7,
		},
	]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	// Add feedback
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	};

	// Delete feedback
	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	// Update feedback item
	const updateFeedback = (id, updItem) => {
		setFeedback(
			feedback.map((item) =>
				item.id === id
					? {
							...item,
							...updItem,
					  }
					: item
			)
		);
	};

	// Set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
