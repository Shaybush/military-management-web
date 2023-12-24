import { FC } from 'react';
import { IChatMessageModel } from '../models/chatMessage.model';

const ChatMessage: FC<IChatMessageModel> = ({ message, userId, isFirstMessage }) => {
	return (
		<div
			className={`${
				message.userId === userId ? 'bg-teal-dark' : 'bg-dark bg-opacity-50'
			} py-2 ps-2 pe-3 text-break rounded`}
		>
			{isFirstMessage && <p className='text-warning'>{message.fullName}</p>}
			<h4 className='text-white font-weight-light'>{message.msg}</h4>
			<p className='text-muted fs-6 mt-2'>{message.time}</p>
		</div>
	);
};

export default ChatMessage;
