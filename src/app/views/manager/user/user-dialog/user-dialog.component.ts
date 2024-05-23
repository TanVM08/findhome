import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import * as _ from 'lodash';
import { FileUtils } from 'src/app/common/utils/file-utils';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  title!: String;
  fileBase64!:any
  userForm!: FormGroup;
  acceptTypeImage: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/pdf',
    'image/psd',
  ];
  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any,
    private api: FetchApiService,
    private toast: ToastNotiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }
  ngOnInit() {
    this.buildForm();
    this.title = this.dataInput.title;
  }

  buildForm() {
    this.userForm = this.fb.group({
      id: [null, []],
      userName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-._]*$')]],
      email: [null, [Validators.required]],
      avatar: [null],
    });
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
    let dataForm = this.userForm.getRawValue();
  }

  doCloseDialog(): void {
    this.dialogRef.close();
  }

}
