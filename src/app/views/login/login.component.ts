import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any,
    public fb: FormBuilder,
    private toastr: ToastNotiService,
    private api: FetchApiService,
    private auth: AuthService,
    public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.buildForm();
  }

  doClose(): void {
    this.dialogRef.close(0);
  }
  buildForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  doLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.showWarning('Thông báo', 'Kiểm tra thông tin đầu vào');
      return;
    }
    let params = this.loginForm.value;
    this.api.post('login', params).subscribe(res => {
      this.auth.authenticate(res);
      this.toastr.showSuccess('Thông báo', 'Đăng nhập thành công');
      this.dialogRef.close(1);
    });
  }

  doRegister() {
    let param: Object = {
      title: "Thêm mới user",
    }
    this.dialog.open(RegisterComponent, {
      width: '25%',
      position: { top: '5%' },
      data: param,
    });
    this.dialogRef.close();
  }
}
