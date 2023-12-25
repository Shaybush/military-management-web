import React, { FC, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import IconFile from '../../shared/components/iconFile/iconFile';
import { isStringEmptyUtil } from '../../shared/services/string-util.service';
import { getTimeFromCurrentUnix } from '../../shared/services/date-util.service';
import { isArrayEmpty } from '../../shared/services/array-util.service';
import { IUserDataModel } from '../models/userData.model';
import { IMessageModel } from './models/message.model';
import Header from './header';
import ChatMessage from './chatMessage/chatMessage';

const GroupChatView: FC = () => {
	// all the messages go here
	const [allMessage, setAllMessage] = useState<IMessageModel[]>([]);
	const [userNameFromSocket, setUserNameFromSocket] = useState('');
	const [typing, setTyping] = useState(false);
	const [_userData, _setUserData] = useState<IUserDataModel['data']>(JSON.parse(localStorage['userData']) || {});
	const socket = io('http://localhost:3001');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const messages = localStorage['messages'] && JSON.parse(localStorage['messages']);
		if (messages && !isArrayEmpty(messages)) setAllMessage(messages);

		socketStartConnections();
		return () => {
			// end event listener
			socket.off('nodeObjEvent', onServerListen);
			socket.off('message_delete_event', onMessageDelete);
			socket.off('typing-from-server');
		};
	}, []);

	const socketStartConnections = (): void => {
		socket.on('nodeObjEvent', onServerListen);
		socket.on('message_delete_event', onMessageDelete);
		socket.on('typing-from-server', (id: string, name: string) => {
			// checking if received user typing is current user
			if (_userData?.id !== id) typingEvent(name);
		});
	};

	const onServerListen = (_item: IMessageModel): void => {
		if (!isStringEmptyUtil(_item.msg)) {
			setAllMessage((prev: Array<IMessageModel>) => [...prev, { ..._item, msg: _item.msg.trim() }]);
		}
	};

	const onMessageDelete = (_messageId: string): void => {
		setAllMessage((prev: IMessageModel[]) => prev.filter((message: IMessageModel) => message.msg_id != _messageId));
		localStorage.setItem(
			'messages',
			JSON.stringify(allMessage.filter((message: IMessageModel) => message.msg_id != _messageId))
		);
	};

	const onDelete = (messageId: string): void => {
		if (confirm('Are you sure you want to delete?')) socket.emit('message_delete', messageId);
	};

	const onSub = (e: React.FormEvent): void => {
		e.preventDefault();
		const message: IMessageModel = {
			msg: inputRef.current?.value || '',
			msg_id: crypto.randomUUID(),
			userId: _userData?.id || '',
			fullName: `${_userData?.given_name} ${_userData?.family_name}`,
			time: getTimeFromCurrentUnix(Date.now()),
			img: _userData?.picture || '',
		};
		// clear input
		// inputRef.current.value dont working
		if (inputRef.current) inputRef.current.value = '';
		socket.emit('clientObjEvent', message);
		localStorage.setItem('messages', JSON.stringify([...allMessage, message]));
	};

	const typingEvent = (name: string): void => {
		setUserNameFromSocket(name);
		setTyping(true);
		setTimeout(() => {
			setTyping(false);
		}, 1000);
	};

	return (
		<React.Fragment>
			<Header picture={_userData?.picture || ''} />
			<div className='container'>
				<div className='w-100 border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3'>
					<div className='p-2 chat-container'>
						{allMessage.map((item: IMessageModel, i: number) => {
							return (
								<React.Fragment key={i}>
									{
										// message with avatar image
										allMessage[i]?.userId !== allMessage[i - 1]?.userId ? (
											<div
												className={`d-flex me-5 mb-2 align-items-center px-2 ${
													item.userId === _userData.id && 'justify-content-end'
												}`}
											>
												{item.userId !== _userData.id && (
													<img src={item.img} className='rounded-circle user-image-profile me-1' />
												)}
												<DropdownButton
													className='col-auto mw-75'
													id='dropdown-button'
													title={<ChatMessage message={item} userId={_userData.id} isFirstMessage={true} />}
												>
													{item.userId === _userData.id && (
														<Dropdown.Item className='d-flex align-items-center' onClick={() => onDelete(item.msg_id)}>
															<IconFile iconSrc={'delete-icon'} />
															<p>Delete</p>
														</Dropdown.Item>
													)}
												</DropdownButton>

												{item.userId === _userData.id && (
													<img src={item.img} className='rounded-circle user-image-profile' />
												)}
											</div>
										) : (
											// message without avatar image (sec or larger)
											<div
												className={`d-flex align-items-center mb-2 px-2 text-wrap ${
													item.userId === _userData.id
														? 'justify-content-end chat-group-host-container'
														: 'chat-group-guest-container'
												}`}
											>
												<DropdownButton
													className='col-auto mw-75'
													id='dropdown-button'
													title={<ChatMessage message={item} userId={_userData.id} />}
												>
													{item.userId === _userData.id && (
														<Dropdown.Item className='d-flex align-items-center' onClick={() => onDelete(item.msg_id)}>
															<IconFile iconSrc={'delete-icon'} />
															<p>Delete</p>
														</Dropdown.Item>
													)}
												</DropdownButton>
											</div>
										)
									}
								</React.Fragment>
							);
						})}
					</div>
					{/* user typing */}
					{<div className='typing-container d-flex ms-2'>{`${typing ? `${userNameFromSocket} typing...` : ''}`}</div>}

					{/* input message */}
					<form onSubmit={onSub} className='chat-form bg-white p-2 d-flex align-items-center justify-content-center'>
						<input
							onChange={() => socket.emit('typing', _userData.id, _userData.given_name, _userData.family_name)}
							ref={inputRef}
							className='form-control me-1'
							placeholder='Type here...'
						/>
						<button className='btn btn-dark text-white rounded'>Send</button>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default GroupChatView;
