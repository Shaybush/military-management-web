import { IMessageModel } from './message.model';

export interface IChatMessageModel {
	message: IMessageModel;
	userId: string;
	isFirstMessage?: boolean;
}
