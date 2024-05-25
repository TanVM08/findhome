import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comfirm',
  templateUrl: './dialog-comfirm.component.html',
  styleUrls: ['./dialog-comfirm.component.scss']
})
export class DialogComfirmComponent implements OnInit {
  title!: String;
  message!: String;
  constructor(
    private dialogRef: MatDialogRef<DialogComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }
  doConfirm(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
