import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { REGEX_PATERN } from 'src/app/common/enum/ERegexPatern';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {

  bookingForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<BookingDialogComponent>,
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
    this.bookingForm = this.fb.group({
      id: [null, []],
      displayName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-._]*$')]],
      phoneNumber: [null, [Validators.required,Validators.pattern(REGEX_PATERN.PHONE_NUMBER)]],
      appointDate: [null, [Validators.required]],
      note: [null],
    });
  }
  doClose(): void {
    this.dialogRef.close();
  }

}
