import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { ToastNotiService } from '../services/toastr/toast-noti.service';
import { environment } from 'src/enviroment/enviroment';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private auth: AuthService,
        private toast: ToastNotiService,
        private spinner: NgxSpinnerService
    ) {
    }

    private _totalRq: number = 0;

    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (httpRequest.url.includes('./assets/i18n/')) {
            return next.handle(httpRequest);
        }
        this._totalRq++;
        this.spinner.show();
        return next.handle(this.addAuthToken(httpRequest)).pipe(
            catchError((error: HttpErrorResponse) => {
                let message = '';
                if (error['status'] === 401 || error['status'] === 403) {
                    this.toast.showWarning('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại hệ thống.');
                    localStorage.clear();
                    sessionStorage.clear();
                    // this.router.navigate(['/signin']);
                } else {
                    let pathUrl: string = error.url ? error.url : '';
                    if (pathUrl.includes('login')) {
                        let msg;
                        switch (error.error) {
                            case 'USER_NOT_FOUND':
                                msg = 'Tên đăng nhập không tồn tại';
                                break;
                            case 'PASSWORD_OR_ACCOUNT_IN_ACTIVE':
                                msg =
                                    'Mật khẩu không đúng hoặc tài khoản đang bị khoá';
                                break;
                        }
                        this.toast.showWarning('Thông báo', msg);
                    } else {
                        this.toast.showError(
                            'Lỗi',
                            'Có lỗi phát sinh:<br>Vui lòng liên hệ bộ phận IT để được hỗ trợ.'
                        );
                    }
                }
                return throwError(() => new Error(error.error));
            }),
            finalize(() => {
                this._totalRq--;
                if (this._totalRq === 0) {
                    this.spinner.hide();
                }
            })
        );
    }

    addAuthToken(request: HttpRequest<any>) {
        let token: any = sessionStorage.getItem(environment.accessToken);
        let reqClone: any;
        let reqIgnore = ['login']
        if (reqIgnore.includes(request.url)) {
            reqClone = request.clone({
                url: environment.apiUrl + request.url,
            });
        } else {
            reqClone = request.clone({
                url: environment.apiUrl + 'oauth/' + request.url,
            });
        }
        return reqClone;
        // return reqClone.clone({
        //     setHeaders: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });
    }
}
