import {DOCUMENT} from '@angular/common'
import {Component, Inject, LOCALE_ID, OnInit, Renderer2} from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(@Inject(DOCUMENT) doc: Document, @Inject(LOCALE_ID) locale: string, renderer: Renderer2) {
        renderer.setAttribute(doc.documentElement, 'lang', locale)
    }

    ngOnInit(): void {
    }
}
