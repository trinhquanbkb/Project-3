export enum ObjectType {
	AVATAR = "avatar",
	GREETING_BANNER = "greeting_banner",
	NEGATIVE_FEEDBACK_BANNER = "negative_feedback_banner",
	POSITIVE_FEEDBACK_BANNER = "positive_feedback_banner",
}
export interface IUploadFile {
	objectId: string;
	objectType: ObjectType;
	file: File;
	type: string;
}
