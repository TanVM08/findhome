import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import { FileUtils } from 'src/app/common/utils/file-utils';
import * as _ from 'lodash';
import { USER } from 'src/app/common/enum/EApiUrl';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  userForm!: FormGroup;
  fileBase64!: any
  acceptTypeImage: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/pdf',
    'image/psd',
  ];
  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any,
    private api: FetchApiService,
    private toast: ToastNotiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      id: [null, []],
      userName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-._]*$')]],
      email: [null, [Validators.required]],
      userPass: [null, [Validators.required]],
      userPassConfirm: [null, [Validators.required]],
      avatar: [null],
    });
  }

  getValueToField(item: any) {
    return this.userForm.get(item)?.value
  }

  setValueToField(item: any, data: any) {
    return this.userForm.get(item)?.setValue(data);
  }
  uploadFile(event: any) {
    if (event) {
      let fileAvatar = event.target.files[0];
      if (!_.includes(this.acceptTypeImage, fileAvatar.type)) {
        this.toast.showWarning(
          'Cảnh báo',
          'Chỉ được upload file có định dạng ảnh !'
        );
        return;
      } else {
        let fileUtils = new FileUtils();
        fileUtils.convertFileToBase64(fileAvatar).subscribe((base64) => {
          this.fileBase64 = base64;
          this.setValueToField('avatar', this.fileBase64);
        });
      }
    }
  }

  doSave() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.toast.showWarning('Cảnh báo', 'Vui lòng nhập đầu đủ thông tin !');
      return;
    }
    if (this.getValueToField('userPass') !== this.getValueToField('userPassConfirm')) {
      this.toast.showWarning('Cảnh báo', 'Mật khẩu và mật khẩu xác nhận không trùng khớp!');
      return;
    }
    let dataForm = this.userForm.getRawValue();
    console.log('data', dataForm);
    this.api.post(USER.CREATE_OR_UPDATE, dataForm).subscribe((res) => {
      console.log('data', res);
      if (res.data == 0) {
        this.toast.showSuccess('Thông báo', 'Tài khoản của bạn đã được tạo');
        this.doClose();
      } else if (res.data == 1) {
        this.toast.showWarning('Thông báo', 'Tên đăng nhập đã tồn tại. Vui lòng nhập lại')
      } else if (res.data == 2) {
        this.toast.showWarning('Thông báo', 'Email đã tồn tại. Vui lòng nhập lại')
      }
    })

  }

  doClose(): void {
    this.dialogRef.close();
  }
}
