export class InfoPage {

    _id: string

    lang: string

    name: string
    text: string

    constructor(name: string, text: string, lang: string) {
        this.lang = lang
        this.name = name
        this.text = text
    }
}
