import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  colorBase = 'accent' as ThemePalette;
  priceStart = 100;
  priceEnd = 400;
  lstDistrict: any = [
    {
      value: -1,
      name: '--Tất cả--',
    },
    {
      value: 1,
      name: 'Bắc Từ Liêm',
    },
    {
      value: 2,
      name: 'Nam Từ Liêm',
    },
    {
      value: 3,
      name: 'Hoàn Kiếm',
    },
    {
      value: 4,
      name: 'Cầu Giấy',
    },
    {
      value: 5,
      name: 'Hà Đông',
    },
  ];

  lstWard: any = [];

  lstAccuracy: any = [
    {
      value: -1,
      name: '--Tất cả--',
    },
    {
      value: 1,
      name: 'Đã xác thực',
    },
    {
      value: -1,
      name: 'Chưa xác thực',
    },
  ];

  lstTypeHouse: any = [
    {
      value: -1,
      name: '--Tất cả--',
    },
    {
      value: 1,
      name: 'Phòng cho thuê',
    },
    {
      value: 2,
      name: 'Phòng ở ghép',
    },
    {
      value: 3,
      name: 'Kí túc xá',
    },
    {
      value: 4,
      name: 'Nhà nguyên căn',
    },
    {
      value: 5,
      name: 'Căn hộ',
    }
  ];

  formatLabel(value: number): string {
    if (value >= 500000) {
      return (value / 1000000) + 'tr';
    }

    return `${value}`;
  }

  isCheck() {
    console.log('priceStart', this.priceStart);
    console.log('priceEnd', this.priceEnd);
  }
  ngOnInit(): void {}
}
