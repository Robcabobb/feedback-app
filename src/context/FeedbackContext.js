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

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	};

	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
