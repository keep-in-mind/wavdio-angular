import {Component, Input, OnInit} from '@angular/core'

import {Exhibit} from '../../../../models/exhibit'

@Component({
    selector: 'app-common-exhibit-card',
    templateUrl: './common-exhibit-card.component.html',
    styleUrls: ['./common-exhibit-card.component.css']
})
export class CommonExhibitCardComponent implements OnInit {

    private _height: string
    private _width: string

    @Input() link: string
    @Input() exhibit: Exhibit
    @Input() selectedLanguage: string

    @Input()
    set height(height: string) {
        this._height = height || '100px'
    }

    get height(): string {
        return this._height
    }

    @Input()
    set width(width: string) {
        this._width = width || '100px'
    }

    get width(): string {
        return this._width
    }

    constructor() {
    }

    ngOnInit() {
        if (null == this.exhibit) {
            throw new Error('Exhibit is required')
        }
    }
}
