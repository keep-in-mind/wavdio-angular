export class Audio {

    filename: string
    mimeType: string
    transcript: string

    constructor(filename: string, mimeType: string) {
        this.filename = filename
        this.mimeType = mimeType
    }
}
