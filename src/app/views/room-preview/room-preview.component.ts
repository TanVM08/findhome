import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-room-preview',
  templateUrl: './room-preview.component.html',
  styleUrls: ['./room-preview.component.scss'],
})
export class RoomPreviewComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RoomPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any
  ) {}
  ngOnInit(): void {}

  doClose(): void {
    this.dialogRef.close();
  }
}
