export type PhotoType = "image" | "video";
export declare class Photo {
    type: PhotoType;
    id: string;
    url: string;
    constructor(input: Photo);
}
export type VerificationChannel = "email" | "sms";
