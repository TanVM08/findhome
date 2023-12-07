import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-room-preview',
  templateUrl: './room-preview.component.html',
  styleUrls: ['./room-preview.component.scss'],
})
export class RoomPreviewComponent implements OnInit {
  imgMain: any;
  imgLast: any;
  lstImgSub: any = [];
  numberMore!: number;

  constructor(
    private dialogRef: MatDialogRef<RoomPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any
  ) {
    console.log('dataPreview', dataInput);
    if (dataInput.lstImage) {
      this.imgMain = dataInput.lstImage[0];
      this.imgLast = dataInput.lstImage[4];
      this.lstImgSub = _.slice(dataInput.lstImage, 1, 4);
      if (dataInput.lstImage.length > 5) {
        this.numberMore = dataInput.lstImage.length - 5;
      }
    }
  }
  ngOnInit(): void {}

  formatCurrency(value: number): string {
    if (isNaN(value)) {
      return '';
    }
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }

  doClose(): void {
    this.dialogRef.close();
  }
}
