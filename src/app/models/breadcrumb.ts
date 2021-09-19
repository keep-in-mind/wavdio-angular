export class Breadcrumb {
    text: string
    url: string

    constructor(text: string, url: string = null) {
        this.text = text
        this.url = url
    }
}
