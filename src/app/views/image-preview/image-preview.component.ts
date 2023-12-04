import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit {

  imgActive:any;
  ltsImage:any=[];
  constructor(
    private dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any
  ) {
    console.log('dataInput', dataInput);
    this.imgActive=dataInput.imgActive;
    this.ltsImage=dataInput.lstImage
  }
  ngOnInit(): void {}

  doClose(): any {
    this.dialogRef.close();
  }
}
