import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { masterURL } from '../masterURL';
import { UserInterface } from '../../../interfaces/user/user-interface';
import { RegistrationResponseInterface } from './interfaces/registration-response-interface';
import { catchError, pipe, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { LoginUserInterface } from '../../../interfaces/user/login-user-interface';
import { Router } from '@angular/router'
import { TokenInterface } from './interfaces/token-interface';
import { UuidService } from '../../uuid/uuid-service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private cookieService = inject(CookieService)
  private uuidService = inject(UuidService)
   
  private mainUrl = masterURL + '/' + 'api/user/'
  token: string | null = null
  refreshToken: string | null = null

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token
  }

  registration(userInformation: UserInterface) {
    console.log(userInformation)
    
    const formData = new FormData()
    formData.append('id', this.uuidService.generateUUID())
    formData.append('avatar', userInformation.avatar)
    formData.append('username', userInformation.username)
    formData.append('fullname', userInformation.fullname)
    formData.append('email', userInformation.email)
    formData.append('password', userInformation.password)
    
    return this.http.post<RegistrationResponseInterface>(
        this.mainUrl + 'register',
        formData
      ).pipe(
        tap(val => this.saveTokens(val.tokens))
      )
  }
  
  login(userLoginInformation: LoginUserInterface) {
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json')

    return this.http.post<RegistrationResponseInterface>(
      this.mainUrl + 'login',
      userLoginInformation,
      {
        headers: headers
      }
    ).pipe(
      tap(val => this.saveTokens(val.tokens))
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  refreshAuthToken() {
    return this.http.post<TokenInterface>(
      this.mainUrl + 'refresh',
      JSON.stringify({
        'refresh_token': this.refreshToken
      })
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  saveTokens(val: TokenInterface) {
    this.token = val.acces_token
    this.refreshToken = val.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}