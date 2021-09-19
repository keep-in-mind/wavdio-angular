export class Video {

    filename: string
    mimeType: string
    transcript: string

    constructor(filename: string, mimeType: string, transcript: string) {
        this.filename = filename
        this.mimeType = mimeType
        this.transcript = transcript
    }
}
