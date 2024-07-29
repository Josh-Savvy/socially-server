import { randomUUID } from "crypto";

export type PhotoType = "image" | "video";

export class Photo {
	type!: PhotoType;
	id!: string;
	url!: string;

	constructor(input: Photo) {
		Object.assign(this, input);
		this.id = randomUUID();
	}
}
