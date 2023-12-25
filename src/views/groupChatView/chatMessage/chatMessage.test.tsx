import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { IChatMessageModel } from '../models/chatMessage.model';
import ChatMessage from './chatMessage';

const chatMessageTestData: IChatMessageModel = {
	userId: '1',
	isFirstMessage: true,
	message: {
		fullName: 'john snow',
		img: '',
		msg: '',
		msg_id: '',
		time: '',
		userId: '',
	},
};

describe('ChatMessage Component', () => {
	const renderChatMessage = () =>
		render(
			<ChatMessage
				message={chatMessageTestData.message}
				userId={chatMessageTestData.userId}
				isFirstMessage={chatMessageTestData.isFirstMessage}
			/>
		);

	test('should renders the chat message component', () => {
		renderChatMessage();
	});
});
