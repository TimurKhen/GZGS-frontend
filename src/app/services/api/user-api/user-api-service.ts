import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { masterURL } from '../masterURL';
import { UserInterface } from '../../../interfaces/user/user-interface';
import { RegistrationResponseInterface } from './interfaces/registration-response-interface';
import { catchError, map, Observable, of, pipe, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { LoginUserInterface } from '../../../interfaces/user/login-user-interface';
import { Router } from '@angular/router'
import { TokenInterface } from './interfaces/token-interface';
import { UuidService } from '../../uuid/uuid-service';
import { ErrorCatcherService } from '../../rxjs/error-catcher/error-catcher-service';


interface UserInformation {
  avatar_url: string,
  email: string,
  fullname: string,
  id: string,
  username: string
}

interface serverAnswer {
  user: UserInformation
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private cookieService = inject(CookieService)
  private uuidService = inject(UuidService)
  private errorHandler = inject(ErrorCatcherService)

  private mainUrl = masterURL + '/' + 'api/user/'
  token: string | null = null
  refreshToken: string | null = null
  userData: serverAnswer | null = null

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token
  }

  get userInfo(): Observable<serverAnswer> {
    if (!this.userData) {
      return this.getUser()
    }

    return of(this.userData)
  }

  protected showError(message: string): void {
    this.errorHandler.showAlert(
      `${message}`,
      {
        appearance: 'negative',
        data: {
          theme: 'dark'
        }
      }
    )
  }

  registration(userInformation: UserInterface) {
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
        catchError((val) => 
          {
            this.showError(`${val.status}: ${JSON.stringify(val.error)}`)
            return throwError(val)
          }
        ),
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
      catchError((val) => 
        {
          this.showError(`${val.status}: ${JSON.stringify(val.error)}`)
          return throwError(val)
        }
      ),
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

  saveUser(val: serverAnswer) {
    this.userData = val
    this.cookieService.set('user', JSON.stringify(this.userData))
  }

  dataChanger(value: serverAnswer): serverAnswer {
    let cloned = structuredClone(value)
    cloned.user.avatar_url = `${masterURL}/${value.user.avatar_url}`    
    console.log(cloned)
    return cloned
  }

  getUser() {
    if (this.userData !== null) return of(this.userData)
    return this.http.get<serverAnswer>(masterURL + '/api/' + 'user').pipe(
      map(val => this.dataChanger(val)),
      tap(val => this.saveUser(val))
    ) 
  }
}