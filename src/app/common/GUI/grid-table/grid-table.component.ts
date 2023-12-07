import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';
import { Router } from '@angular/router';
interface RowData {
  // Define your properties here
}
@Component({
  selector: 'grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss'],
})
export class GridTableComponent implements OnInit {
  // @Input() dataSource: any;
  @Input() tableColumns: any = [];
  @Input() tableAction?: any;
  @Input() totalItems: number = 0;
  @Input() widthTable?: number;
  @Input() showCheckbox?: boolean = false;
  @Input() isTableOpen?: boolean = true;
  @Input() showButtonAddNew: boolean = false;
  @Input() showButtonImportFile: boolean = false;
  @Input() showButtonExportFile: boolean = false;
  @Input() showButtonSendMail: boolean = false;
  @Input() dataSource: RowData[] = [];
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<void>();

  @Input() pageInfo: any = {
    pageSize: 10,
    page: 0,
  };

  @Output() doChangePage: EventEmitter<any> = new EventEmitter();
  @Output() disableDelete: EventEmitter<boolean> = new EventEmitter();
  @Output() btnAddNew: EventEmitter<void> = new EventEmitter();
  @Output() btnSendMail: EventEmitter<void> = new EventEmitter();
  @Output() btnImportFile: EventEmitter<void> = new EventEmitter();
  @Output() btnExportFile: EventEmitter<void> = new EventEmitter();
  columnsView: any = [];
  displayedColumns: string[] = [];
  checkAll: boolean = false;

  toppings = this._formBuilder.group({
    checkbox: false,
  });

  constructor(private router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.showCheckbox) {
      this.checkAll = false;
    }
    if (this.tableColumns) {
      this.displayedColumns = [];
      this.columnsView = [];
      this.checkAll = false;
      this.initTable();
    }
  }

  initTable(): void {
    let cols: any = [];
    this.tableColumns.forEach((obj: any) => {
      if (!obj.options || obj.options.display !== true) {
        this.columnsView = [...this.columnsView, obj];
        obj['view'] = true;
      }
      cols = [...cols, obj];
    });
    this.tableColumns = _.cloneDeep(cols);
    let rs: any = [];

    if (this.showCheckbox && this.showCheckbox === true) {
      rs.push('checkbox');
      rs.push('no');
    } else {
      rs.push('no');
    }

    if (this.tableAction) {
      rs.push('func');
    }

    rs = _.concat(
      rs,
      this.columnsView.map((col: any) => col.name)
    );
    this.displayedColumns = rs;
  }

  renderValue(obj: any, column: any, index: number): any {
    if (column && column.options) {
      let options = _.cloneDeep(column.options);
      if (options.customBodyRender) {
        let str = options.customBodyRender(obj[column.name], obj, index);
        return str;
      }
    }
    return obj[column.name];
  }

  renderValueIcon(obj: any, column: any): any {
    return obj[column.name];
  }

  changeViewColumn(col: any, index: number): void {
    if (col.view === true) {
      this.columnsView.splice(index, 0, col);
    } else {
      this.columnsView = _.reject(this.columnsView, (obj) => {
        return obj.name === col.name;
      });
    }
    let rs: any = ['no', 'func'];
    rs = _.concat(
      rs,
      this.columnsView.map((col: any) => col.name)
    );
    this.displayedColumns = rs;
  }

  onChangePage(event: any) {
    this.checkAll = false;
    this.pageInfo['pageSize'] = event.pageSize;
    this.pageInfo['page'] = event.pageIndex;
    this.doChangePage.emit(this.pageInfo);
  }

  viewIconName(action: any, item: any) {
    if (action.customIcon) {
      return action.customIcon(item);
    } else {
      return action['icon'];
    }
  }

  viewTooltipName(action: any, item: any) {
    if (action.customTooltip) {
      return action.customTooltip(item);
    } else {
      return action['tooltip'];
    }
  }

  checkDisplay(action: any, item: any) {
    if (action.display) {
      return action.display(item);
    } else {
      return true;
    }
  }

  doClickAction(action: any, obj: any) {
    if (action.doAction) {
      action.doAction(obj);
    }
  }

  onCheckAll(ob: MatCheckboxChange) {
    if (ob && ob.checked === true) {
      this.dataSource.forEach((obj: any) => {
        obj['checked'] = true;
        this.disableDelete.emit(false);
      });
    } else {
      this.checkAll = false;
      this.dataSource.forEach((obj: any) => {
        obj['checked'] = false;
      });
      this.disableDelete.emit(true);
    }
  }

  onCheckItem(ob: MatCheckboxChange) {
    let itemCheck = _.filter(this.dataSource, (obj: any) => {
      return obj['checked'] === true;
    });
    if (itemCheck && itemCheck.length === this.dataSource.length) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
    if (itemCheck && itemCheck.length > 0) {
      this.disableDelete.emit(false);
    } else {
      this.disableDelete.emit(true);
    }
  }
}
