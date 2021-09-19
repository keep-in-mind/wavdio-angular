import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {CookieService} from 'ngx-cookie-service'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

export interface UserDetails {
    session_id: string;
    session_timeout: Date;
    iat: number;
}

interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    password: string;
    username: string;
}

export interface TokenPayloadUpdate {
    username: string;
    password: string;
    newUsername: string;
    newPassword: string;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private token: string

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    }

    private saveToken(user, token): void {
        this.cookieService.set('mean-token', token, new Date(user.session_timeout))
        this.cookieService.set('mean-session', user.session_id, new Date(user.session_timeout))
        this.token = token
    }

    private getToken(): string {
        if (!this.token) {
            this.token = this.cookieService.get('mean-token')
        }
        return this.token
    }

    public register(user: TokenPayload): Observable<any> {
        return this.request('post', 'register', user)
    }

    public update(user: TokenPayloadUpdate): Observable<any> {
        return this.request('post', 'update', user)
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken()
        let payload
        if (token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else {
            return null
        }
    }

    public _getUserDetails(token): UserDetails {
        let payload
        payload = token.split('.')[1]
        payload = window.atob(payload)
        return JSON.parse(payload)
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails()
        if (user) {
            return (this.cookieService.get('mean-session') != null) && (new Date(user.session_timeout) > new Date()) &&
                (user.session_id === this.cookieService.get('mean-session'))
        } else {
            return false
        }
    }

    public getSessionID() {
        return this.cookieService.get('mean-session')
    }

    public getAuthorizationHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': `${this.getSessionID()}`
            })
        }
    }

    private request(method: 'post' | 'get', type: 'login' | 'register' | 'update' | 'session', user?: TokenPayload): Observable<any> {
        let base

        if (method === 'post') {
            base = this.http.post(`/api/v2/${type}`, user)
        } else {
            base = this.http.get(`/api/v2/${type}`, {headers: {Authorization: `${this.getUserDetails().session_id}`}})
        }

        const request = base.pipe(
            tap((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(this._getUserDetails(data.token), data.token)
                }
                return data
            })
        )
        return request
    }

    public login(user: TokenPayload): Observable<any> {
        return this.request('post', 'login', user)
    }

    public logout(): void {
        this.token = ''
        this.cookieService.delete('mean-token')
        this.cookieService.delete('mean-session')
        this.router.navigate(['/admin'])
    }
}
