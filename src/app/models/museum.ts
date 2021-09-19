import {MuseumContent} from './museum-content'

export class Museum {

    _id: string
    contents: MuseumContent[]

    constructor(_id: string = null, contents: MuseumContent[]) {
        this._id = _id
        this.contents = contents
    }

    static fromJSON(json: any): Museum {
        return new this(json._id, json.contents)
    }

    getContent(locale: string): MuseumContent {
        for (const content of this.contents) {
            if (content.lang === locale) {
                return content
            }
        }

        // not found ? must not happen. has to be created when constructing museum
        console.error(`MuseumContent missing for locale ${locale}`)
        return null
    }
}
