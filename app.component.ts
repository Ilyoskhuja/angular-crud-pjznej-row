import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  TreeGridComponent,
  RowDDService,
  SelectionService,
  SortService,
  EditService,
  ToolbarService,

  FilterService
} from '@syncfusion/ej2-angular-treegrid';
// SelectionSettingsModel,
// EditEventArgs,
// EditSettingsModel,
import { Treerow } from './treerow';
import { v4 as uuidv4 } from 'uuid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

import { Browser } from '@syncfusion/ej2-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DialogEditEventArgs } from '@syncfusion/ej2-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  DataManager,
  WebApiAdaptor,
  Query,
  ReturnOption,
  UrlAdaptor,
} from '@syncfusion/ej2-data';

import { addClass, removeClass } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [
    RowDDService,
    SelectionService,
    SortService,
    ToolbarService,
    EditService,
    FilterService
  ],

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app.component.css'],
})
export class AppComponent {


@ViewChild('taskName')
public taskNameM: CheckBoxComponent;
@ViewChild('duration')
public durationM: CheckBoxComponent;
@ViewChild('startDate')
public startDateM: CheckBoxComponent;
@ViewChild('endDate')
public endDateM: CheckBoxComponent;
@ViewChild('priority')
public priorityM: CheckBoxComponent;
@ViewChild('progress')
public progressM: CheckBoxComponent;



  public sortSettings: Object;
  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
  public isModal: boolean = true;
  public data: Object[] = [];
  public dm: DataManager;
  public customAttributes: Object;
  // public data: DataManager;
  public editSettings: EditSettingsModel;
  public Properties: boolean = false;
  public selectOptions: Object;
  public d1data: Object;
  public ddlfields: Object;
  public d2data: any;
  public d3data: any;
  public d4data: any;
  public d5data: any;
  public format: Object;
  public fields: Object;
  public selectedRow: any;
  public copiedRow: any;
  public pageSetting: Object;
  public ColType: string = '';
  ColAlign: string = '';
  ColChecked: boolean = false;
  ColMinWidth: number;
  ColFColor: string = '';
  ColBColor: string = '';
  checkNewEdit: string;
  public rowIndex: number;

  public selectionOptions: SelectionSettingsModel;

  public formatOptions: Object;
  public editOptions: Object;
  public stringRule: Object;
  public taskidRule: Object;
  public progressRule: Object;
  public dateRule: Object;
  /**buttons */
  public nde: boolean = false;
  /*** */
  @ViewChild('columns')
  public columns: NumericTextBoxComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  columnValue: number;
  columnField: string;
  public dateformat: Object;
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  public contextMenuItems: Object;
  public templateOptions: object;
  public sorting: boolean = false;
  public filtering: boolean = false;
  public showChooser: boolean = false;
  public MultiSelect: boolean = false;
  public textWrap: boolean = false;
  public allowResizing: boolean = false;
  public showEditColumn: boolean = false;
  public addNew: boolean = false;
  public ColName: string = '';
  public allowDAD: boolean = false;
  public allowReorder: boolean = false;
  public flag: boolean = false;
  public filterSettings: Object;
  public dropDownFilter: DropDownList;
  public toolbar: string[];
  public selectList = [
    {
      name: 'toto',
      value: 'toto',
    },
    {
      name: 'titi',
      value: 'titi',
    },
    {
      name: 'tata',
      value: 'tata',
    },
    {
      name: 'tutu',
      value: 'tutu',
    },
  ];
  // public editSettings: Object;
  public listHeadersC: any = [
    {
      field: 'TaskID',
      headerText: 'Task ID',
      isPrimaryKey: true,
      // editType: "defaultedit",
    },
    {
      field: 'TaskName',
      headerText: 'Task Name',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'StartDate',
      headerText: 'Start Date',
      type: 'date',
      format: 'dd/MM/yyyy',
      textAlign: 'Right',
      editType: 'datepickeredit',
    },
    {
      field: 'EndDate',
      headerText: 'End Date',
      format: 'yMd',
      textAlign: 'Right',
      editType: 'datepickeredit',
      type: 'date',
    },
    {
      field: 'Duration',
      headerText: 'Duration',
      textAlign: 'Right',
      editType: 'numericedit',
      type: 'number',
    },

    {
      field: 'Progress',
      headerText: 'Progress',

      textAlign: 'Right',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'Priority',
      headerText: 'Priority',
      editType: 'dropdownedit',
      type: 'string',
    },
  ];
  public listHeaders: any = [
    {
      field: 'TaskID',
      headerText: 'Task ID',
      isPrimaryKey: true,
      allowFiltering: false,
      allowSorting: false,
      // editType: "defaultedit",
    },
    {
      field: 'TaskName',
      headerText: 'Task Name',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'StartDate',
      headerText: 'Start Date',
      type: 'date',
      format: 'dd/MM/yyyy',
      textAlign: 'Right',
      editType: 'datepickeredit',
    },
    {
      field: 'EndDate',
      headerText: 'End Date',
      format: 'yMd',
      textAlign: 'Right',
      editType: 'datepickeredit',
      type: 'date',
    },
    {
      field: 'Duration',
      headerText: 'Duration',
      textAlign: 'Right',
      editType: 'numericedit',
      type: 'number',
    },

    {
      field: 'Progress',
      headerText: 'Progress',

      textAlign: 'Right',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'Priority',
      headerText: 'Priority',
      editType: 'dropdownedit',
      type: 'string',
    },
  ];

  public fieldData: any = [];
  // public flag: any = false;
  public cutRow: any;
  public cutRowBool: boolean = false;

  // public contextMenuItems: any;
  public treeColumns: any;
  @ViewChild('dropdown1')
  public dropdown1: DropDownListComponent;
  @ViewChild('dropdown2')
  public dropdown2: DropDownListComponent;

  @ViewChild('dropdown3')
  public dropdown3: DropDownListComponent;
  @ViewChild('dropdown4')
  public dropdown4: DropDownListComponent;
  @ViewChild('taskForm')
  public taskForm: FormGroup;
  public dataManager: DataManager = new DataManager({
    url: 'https://vom-app.herokuapp.com/tasks?limit=14000',
    updateUrl: 'https://vom-app.herokuapp.com/tasks',
    insertUrl: 'https://vom-app.herokuapp.com/tasks',
    removeUrl: 'https://vom-app.herokuapp.com/tasks',
    crossDomain: true,
    adaptor: new WebApiAdaptor(),
  });
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.initilaizeTarget();
    this.sortSettings =  { 
      columns: [
    //     { field: 'TaskName', direction: 'Ascending'  }, 
    // { field: 'StartDate', direction: 'Ascending' },
    // { field: 'EndDate', direction: 'Ascending' },
    // { field: 'Duration', direction: 'Ascending' },
    // { field: 'Priority', direction: 'Ascending' },
    // { field: 'Progress', direction: 'Ascending' },
  
  ]
}
    this.customAttributes = { class: 'customcssa' };
    this.selectionOptions = {
      type: 'Multiple',
      mode: 'Row',
    };
    this.treeColumns = this.listHeaders;
    this.formatOptions = { format: 'M/d/y hh:mm a', type: 'dateTime' };
    this.progressRule = { number: true, min: 0 };
    this.taskidRule = { required: true, number: true };
    this.dateRule = { date: true };
    this.stringRule = { required: true };
    this.dataManager
      .executeQuery(new Query())
      .then((e: ReturnOption) => (this.data = e.result.data as object[]))
      .catch((e) => true);

    this.pageSetting = { pageCount: 3 };

    // this.editSettings = {
    //   allowEditing: true,
    //   allowAdding: true,
    //   allowDeleting: true,

    //   newRowPosition: 'Child',
    //   // newRowPosition: 'Top',
    //   mode: 'Batch',
    // };

    this.format = { format: 'M/d/yyyy', type: 'date' };

    this.ddlfields = { text: 'name', value: 'id' };
    (this.d1data = [
      { id: 'taskID', name: 'Task Id' },
      { id: 'taskName', name: 'Task Name' },
    ]),
      (this.d2data = [
        { id: 'string', type: 'string' },
        { id: 'number', type: 'number' },
        { id: 'boolean', type: 'boolean' },
        { id: 'datetime', type: 'datetime' },
        { id: 'date', type: 'date' },
      ]),
      (this.d3data = [
        { id: 'right', type: 'Right' },
        { id: 'left', type: 'Left' },
        { id: 'Center', type: 'Center' },
      ]),
      (this.d4data = [
        { id: '105px', type: '105px' },
        { id: '125px', type: '125px' },
        { id: '145px', type: '145px' },
        { id: '150px', type: '150px' },
        { id: '155px', type: '155px' },
        { id: '165px', type: '165px' },
      ]),
      (this.d5data = [
        { id: 'customcssa', type: 'BC:blue/FC:yellow/FS:20px' },
        { id: 'customcssb', type: 'BC:blue/FC:white/FS:20px' },
        { id: 'customcssc', type: 'BC:green/FC:white/FS:15px' },
        { id: 'customcssd', type: 'BC:green/FC:yellow/FS:15px' },
      ]),
      (this.fields = { text: 'type', value: 'id' });
    this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
    this.contextMenuItems = [
      {
        text: 'Add/Delete/Edit (Dialog)  ',
        target: '.e-content',
        id: 'rndeDialog',
      },
      { text: 'Add/Delete/Edit (Row)  ', target: '.e-content', id: 'rndeRow' },

      { text: 'Multi-Select', target: '.e-content', id: 'rmultiSelect' },
      { text: 'Copy', target: '.e-content', id: 'rcopy' },

      { text: 'Paste Sibling', target: '.e-content', id: 'rsibling' },
      { text: 'Paste Child', target: '.e-content', id: 'rchild' },
      {
        id: 'cut',
        text: 'Cut',
        target: '.e-content',
        iconCss: 'e-cm-icons e-cut',
      },
      // { text: 'Style', target: '.e-headercontent', id: 'style' },

      { text: 'EditCol ', target: '.e-headercontent', id: 'editCol' },
      { text: 'NewCol ', target: '.e-headercontent', id: 'newCol' },

      { text: 'DeleteCol ', target: '.e-headercontent', id: 'deleteCol' },
      { text: 'Show', target: '.e-headercontent', id: 'columnChooser' },
      { text: 'Freeze', target: '.e-headercontent', id: 'freeze' },

      { text: 'Filter', target: '.e-headercontent', id: 'filter' },
      { text: 'Multi-Sort', target: '.e-headercontent', id: 'multiSort' },
    ];
    this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
    this.templateOptions = {
      create: (args: { element: Element }) => {
        let dd: HTMLInputElement = document.createElement('input');
        dd.id = 'duration';
        return dd;
      },
      write: (args: { element: Element }) => {
        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
        this.dropDownFilter = new DropDownList({
          dataSource: dataSource,
          value: 'All',
          change: (e: ChangeEventArgs) => {
            let valuenum: any = +e.value;
            let id: any = <string>this.dropDownFilter.element.id;
            let value: any = <string>e.value;
            if (value !== 'All') {
              this.treegrid.filterByColumn(id, 'equal', valuenum);
            } else {
              this.treegrid.removeFilteredColsByField(id);
            }
          },
        });
        this.dropDownFilter.appendTo('#Duration');
      },
    };
  }
  closeP(data){
    console.log("closeP:",data)
    if(data=='sorting'){
      this.sorting=false;
    }
    if(data=='showChooser')
    this.showChooser=false;
    if(data=='filtering')
   { this.filtering=false; }
  }
  // addColumn() {
  //   var column: any = { field: 'zzzzz', headerText: 'zzzzz', width: 50 };
  //   this.treeColumns.push(column);

  //   console.log("AddColumn:", this.treeColumns);
  //   this.treegrid.refreshColumns();
  // }
  deleteColumnX() {
    this.treegrid.columns.filter((i, x) => {
      if (i.field == this.columnField) {
        this.treegrid.columns.splice(x, 1);
        console.log('x:----', x);
        //you can simply remove based on field name or an index of a column
      }
    });
    // this.listHeadersC=this.listHeadersC.filter(r =>
    //   r.field !== this.columnField
    // );

    // this.treegrid.columns.splice(x,1);
    // this.treeColumns = this.listHeadersC;
    // console.log("-----this.treeColumns:",this.treeColumns)
    this.treegrid.refreshColumns();
  }
  actionComplete(args: EditEventArgs) {
    if (args.requestType === 'sorting') {
      console.log("sorting");
      for (let columns of this.treegrid.getColumns()) {
          for (let sortcolumns of this.treegrid.sortSettings.columns) {
              if (sortcolumns.field === columns.field) {
                  this.check(sortcolumns.field, true); break;
              } else {
                  this.check(columns.field, false);
              }
          }
      }
    }
    if (args.requestType == 'save' && args.action == 'add') {
      const body = {
        TaskID: 0,
        TaskName: args.data.TaskName,
        StartDate: args.data.StartDate,
        EndDate: args.data.EndDate,
        Duration: args.data.Duration,
        Progress: args.data.Progress,
        Priority: args.data.Priority,
        ParentItem: null,
        isParent: args.data.isParent,
      };
      this.http
        .post<any>('https://vom-app.herokuapp.com/tasks', body)
        .subscribe((data) => {
          console.log(data);
          this.dataManager
            .executeQuery(new Query())
            .then((e: ReturnOption) => (this.data = e.result.data as object[]))
            .catch((e) => true);
        });
    }
    if (args.requestType == 'save' && args.action == 'edit') {
      const body = {
        TaskID: args.data.TaskID,
        TaskName: args.data.TaskName,
        StartDate: args.data.StartDate,
        EndDate: args.data.EndDate,
        Duration: args.data.Duration,
        Progress: args.data.Progress,
        Priority: args.data.Priority,
        isParent: args.data.isParent,
      };
      this.http
        .put<any>('https://vom-app.herokuapp.com/tasks', body)
        .subscribe((data) => {
          console.log(data);
          this.dataManager
            .executeQuery(new Query())
            .then((e: ReturnOption) => (this.data = e.result.data as object[]))
            .catch((e) => true);
        });

      // this.treegrid.refresh();
    }
    if (args.requestType == 'save') {
      var index = args.index;
      this.treegrid.selectRow(index); // select the newly added row to scroll to it
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'save') {
      console.log('actionBegin', args.requestType);
    }
  }
  toolabarclickHandler(args) {
    if (args.item.text === 'Add') {
      this.addNew = true;
    }
    if (args.item.text === 'Update') {
      this.treegrid.endEdit();

      if (this.addNew == true) {
        var rowInfo = this.treegrid.getCurrentViewRecords()[0];

        const body = {
          TaskID: 0,
          TaskName: rowInfo.TaskName,
          StartDate: rowInfo.StartDate,
          EndDate: rowInfo.EndDate,
          Duration: rowInfo.Duration,
          Progress: rowInfo.Progress,
          Priority: rowInfo.Priority,
          isParent: rowInfo.isParent,
          ParentItem:
            rowInfo.ParentItem != undefined ? rowInfo.ParentItem : null,
        };
        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log(data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });

        this.addNew = false;
        // this.treegrid.startEdit();
        this.treegrid.refresh();
      } else {
        this.treegrid.endEdit();

        var rowInfo =
          this.treegrid.getCurrentViewRecords()[this.selectedRow.rowIndex];
        const body = {
          TaskID: rowInfo.TaskID,
          TaskName: rowInfo.TaskName,
          StartDate: rowInfo.StartDate,
          EndDate: rowInfo.EndDate,
          Duration: rowInfo.Duration,
          Progress: rowInfo.Progress,
          Priority: rowInfo.Priority,
          isParent: rowInfo.isParent,
        };
        this.http
          .put<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log(data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });
        this.dataManager
          .executeQuery(new Query())
          .then((e: ReturnOption) => (this.data = e.result.data as object[]))
          .catch((e) => true);

        this.treegrid.refresh();
      }
    }

    if (args.item.text === 'Edit') {
      this.treegrid.startEdit(); //you can save a record by invoking endEdit
    }
    if (args.item.text === 'Delete') {
      var rowInfo = this.treegrid.getSelectedRecords()[0];

      this.http
        .delete<any>(`https://vom-app.herokuapp.com/tasks/${rowInfo.TaskID}`)
        .subscribe((data) => {
          console.log(data);
          this.treegrid.refresh();
        });
      this.dataManager
        .executeQuery(new Query())
        .then((e: ReturnOption) => (this.data = e.result.data as object[]))
        .catch((e) => true);

      // this.remove();
      this.treegrid.endEdit(); //you can save a record by invoking endEdit
    }
  }
  public insert(): void {
    this.treegrid.endEdit();
    var rowInfo = this.treegrid.getSelectedRecords()[0];

    const body = {
      TaskID: rowInfo.TaskID,
      TaskName: rowInfo.TaskName,
      StartDate: rowInfo.StartDate,
      EndDate: rowInfo.EndDate,
      Duration: rowInfo.Duration,
      Progress: rowInfo.Progress,
      Priority: rowInfo.Priority,
      isParent: rowInfo.isParent,
    };
    this.http
      .put<any>('https://vom-app.herokuapp.com/tasks', body)
      .subscribe((data) => {
        console.log(data);
        this.dataManager
          .executeQuery(new Query())
          .then((e: ReturnOption) => (this.data = e.result.data as object[]))
          .catch((e) => true);
      });
  }
  public remove(): void {
    var rowInfo = this.treegrid.getRowInfo(
      this.treegrid.getRowByIndex(this.rowIndex)
    );

    this.dm.remove('TaskID', {
      TaskID: rowInfo.TaskID,
      TaskName: rowInfo.TaskName,
      StartDate: rowInfo.StartDate,
      EndDate: rowInfo.EndDate,
      Duration: rowInfo.Duration,
      Progress: rowInfo.Progress,
      Priority: rowInfo.Priority,
    });
    this.dm
      .executeQuery(new Query())
      .then((e: ReturnOption) => (this.data = e.result as object[]))
      .catch((e) => true);
  }
  getCurrentField() {
    console.log(
      'this.checkNewEdit:----------',
      this.checkNewEdit,
      'this.columnField:',
      this.columnField
    );
    if (this.checkNewEdit == 'edit') {
      this.ColName = this.treegrid.getColumnByField(
        this.columnField
      ).headerText;
      console.log(
        '-------this.ColName:----------',
        this.ColName,
        '---------this.columnField:-------------',
        this.columnField
      );
      this.ColType = this.treegrid.getColumnByField(this.columnField).type;
    } else {
      this.ColName = '';
      this.ColType = '';
    }
  }
  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    if (arg.column.headerText == 'Task ID') {
      this.columnValue = 1;
      this.columnField = 'TaskID';
    }
    if (arg.column.headerText == 'Task Name') {
      this.columnValue = 2;
      this.columnField = 'TaskName';
    }
    if (arg.column.headerText == 'Start Date') {
      this.columnValue = 3;

      this.columnField = 'StartDate';
    }
    if (arg.column.headerText == 'End Date') {
      this.columnValue = 4;

      this.columnField = 'EndDate';
    }
    if (arg.column.headerText == 'Duration') {
      this.columnValue = 5;

      this.columnField = 'Duration';
    }

    if (arg.column.headerText == 'Progress') {
      this.columnValue = 6;

      this.columnField = 'Progress';
    }
    if (arg.column.headerText == 'Priority') {
      this.columnValue = 7;

      this.columnField = 'Priority';
    } else {
    console.log('********arg.column*********: ', arg.column);
    this.columnValue = arg.column.index + 1;
    this.columnField = arg.column.field;
    }
    let row: Element = elem.closest('.e-row');
    let uid: string = row && row.getAttribute('data-uid');
    let items: Array<HTMLElement> = [].slice.call(
      document.querySelectorAll('.e-menu-item')
    );
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute('style', 'display: none;');
    }
    if (elem.closest('.e-row')) {
      // if (
      //   isNullOrUndefined(uid) ||
      //   isNullOrUndefined(
      //     getValue(
      //       'hasChildRecords',
      //       this.treegrid.grid.getRowObjectFromUID(uid).data
      //     )
      //   )
      // ) 
      // {
      //   arg.cancel = true;
      // } 
      // else {
      // let flag: boolean = getValue(
      //   'expanded',
      //   this.treegrid.grid.getRowObjectFromUID(uid).data
      // );
      document
        .querySelectorAll('li#rndeDialog')[0]
        .setAttribute('style', 'display: block;');
      document
        .querySelectorAll('li#rndeRow')[0]
        .setAttribute('style', 'display: block;');
      document
        .querySelectorAll('li#rmultiSelect')[0]
        .setAttribute('style', 'display: block;');
      document
        .querySelectorAll('li#rcopy')[0]
        .setAttribute('style', 'display: block;');

      document
        .querySelectorAll('li#cut')[0]
        .setAttribute('style', 'display: block;');
      document
        .querySelectorAll('li#rsibling')[0]
        .setAttribute('style', 'display: block;');

      document
        .querySelectorAll('li#rchild')[0]
        .setAttribute('style', 'display: block;');
      // }
    } else {
      let len =
        this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
      if (len !== 0) {
        // document
        //   .querySelectorAll('li#style')[0]
        //   .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#deleteCol')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#editCol')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#newCol')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#freeze')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#columnChooser')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#filter')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#multiSort')[0]
          .setAttribute('style', 'display: block;');
      } else {
        document
          .querySelectorAll('li#expandall')[0]
          .setAttribute('style', 'display: block;');
      }
    }
  }

  // created(args) {
  //   document.addEventListener(
  //     'keydown',
  //     function (e) {
  //       if (e.keyCode === 88) {
  //         this.flag = true;
  //         for (
  //           var i = 0;
  //           i < this.treegrid.getSelectedRowCellIndexes()[0].cellIndexes.length;
  //           i++
  //         ) {
  //           this.fieldData.push(
  //             this.treegrid.getColumnByIndex(
  //               this.treegrid.getSelectedRowCellIndexes()[0].cellIndexes[i]
  //             ).field
  //           );
  //         }
  //         this.cutIndex = this.treegrid.getSelectedRowCellIndexes();
  //         this.treegrid.copy();
  //       }
  //     }.bind(this)
  //   );
  // }
  // beforePaste(args) {
  //   if (this.flag == true) {
  //     for (var i = 0; i < this.cutIndex.length; i++) {
  //       var rowInfo = this.treegrid.getRowInfo(
  //         this.treegrid.getRowByIndex(this.cutIndex[i].rowIndex)
  //       );
  //       for (var j = 0; j < this.fieldData.length; j++) {
  //         if (rowInfo.rowData[this.fieldData[j]] != '') {
  //           this.treegrid.updateCell(
  //             this.cutIndex[i].rowIndex,
  //             this.fieldData[j],
  //             ''
  //           );
  //         }
  //       }
  //     }
  //   }
  // }
  contextMenuClick(args): void {
    // this.MultiSelect = true;
    if (args.item.text == 'Cut') {
      this.flag = true;
      // for (
      //   var i = 0;
      //   i < this.treegrid.getSelectedRowCellIndexes()[0].cellIndexes.length;
      //   i++
      // ) {
      //   this.fieldData.push(
      //     this.treegrid.getColumnByIndex(
      //       this.treegrid.getSelectedRowCellIndexes()[0].cellIndexes[i]
      //     ).field
      //   );
      // }
      // this.cutIndex = this.treegrid.getSelectedRowCellIndexes();
      // this.treegrid.copyHierarchyMode = 'None';
      // this.treegrid.copy();
      this.cutRow = this.treegrid.getRowByIndex(this.rowIndex);
      this.cutRowBool = true;
      this.treegrid.copyHierarchyMode = 'None';
      this.treegrid.copy();
      this.cutRow.setAttribute('style', 'background:#FFC0CB;');
    }
    if (args.item.id == 'rsibling') {
      if (this.cutRowBool == true) {
        var copyContent = this.treegrid.clipboardModule.copyContent;

        // this.treegrid.paste(copyContent, rowIndex);

        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.ParentItem
        );
        newRecord.children = [];
        newRecord.isParent = true;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };
        this.http
          .delete<any>(
            `https://vom-app.herokuapp.com/tasks/${newRecord.TaskID}`
          )
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.treegrid.refresh();
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });
        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });

        // this.treegrid.addRecord(newRecord, 0, 'Above');

        this.cutRowBool = false;
        this.copiedRow.setAttribute('style', 'background:white;');
      } else {
        var copyContent = this.treegrid.clipboardModule.copyContent;

        // this.treegrid.paste(copyContent, rowIndex);

        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.ParentItem
        );
        newRecord.children = [];
        newRecord.isParent = true;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };

        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });
        this.dataManager
          .executeQuery(new Query())
          .then((e: ReturnOption) => (this.data = e.result.data as object[]))
          .catch((e) => true);
        // this.treegrid.addRecord(newRecord, 0, 'Above');

        this.copiedRow.setAttribute('style', 'background:white;');
      }
    }

    if (args.item.id == 'rchild') {
      if (this.cutRowBool == true) {
        var copyContent = this.treegrid.clipboardModule.copyContent;

        // this.treegrid.paste(copyContent, rowIndex);

        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.TaskID
        );
        newRecord.children = [];
        newRecord.isParent = true;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };
        this.http
          .delete<any>(
            `https://vom-app.herokuapp.com/tasks/${newRecord.TaskID}`
          )
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.treegrid.refresh();
            this.http
              .post<any>('https://vom-app.herokuapp.com/tasks', body)
              .subscribe((data) => {
                this.dataManager
                  .executeQuery(new Query())
                  .then(
                    (e: ReturnOption) => (this.data = e.result.data as object[])
                  )
                  .catch((e) => true);
              });
          });

        // this.treegrid.addRecord(newRecord, 0, 'Above');

        this.cutRowBool = false;
        this.copiedRow.setAttribute('style', 'background:white;');
      } else {
        var copyContent = this.treegrid.clipboardModule.copyContent;
        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.TaskID
        );
        newRecord.children = [];
        newRecord.isParent = false;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };

        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.dataManager
            .executeQuery(new Query())
            .then((e: ReturnOption) => (this.data = e.result.data as object[]))
            .catch((e) => true);
          });
       
        // this.treegrid.addRecord(newRecord, this.selectedRow.row.rowIndex,'Child');
        this.copiedRow.setAttribute('style', 'background:white;');
      }
    } else if (args.item.id === 'deleteCol') {
      this.deleteColumnX();
    } else if (args.item.id === 'rndeDialog') {
      this.editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Dialog',
        newRowPosition: 'Below',
      };
      this.toolbar = ['Add', 'Edit', 'Delete'];
    } else if (args.item.id === 'rndeRow') {
      this.editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Row',
      };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update'];
    } else if (args.item.id === 'rmultiSelect') {
      this.MultiSelect = true;
    } else if (args.item.id === 'editCol') {
      this.checkNewEdit = 'edit';
      this.showEditColumn = true;
      this.getCurrentField();
    } else if (args.item.id === 'newCol') {
      this.checkNewEdit = 'add';
      this.showEditColumn = true;
      this.getCurrentField();
    }
    // else if (args.item.id === 'style') {
    //   this.Properties = !this.Properties;
    // }
    else if (args.item.id === 'columnChooser') {
      this.showChooser = !this.showChooser;
    } else if (args.item.id === 'multiSort') {
      this.sorting = !this.sorting;
    } else if (args.item.id === 'filter') {
      this.filtering = true;
      console.log("this.filtering:",this.filtering)
    } else if (args.item.id === 'freeze') {
      this.treegrid.frozenColumns = this.columnValue;
    } else if (args.item.id === 'rcopy') {
      this.MultiSelect = true;

      this.editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,

        newRowPosition: 'Child',
        mode: 'Batch',
      };
      this.copiedRow = this.treegrid.getRowByIndex(this.rowIndex);

      this.treegrid.copyHierarchyMode = 'None';
      this.treegrid.copy();
      this.copiedRow.setAttribute('style', 'background:#FFC0CB;');
    }
  }
  public onClicked(e: MouseEvent): void {
    if (!this.flag) {
      return;
    }

    let element: HTMLElement = <HTMLInputElement>e.target;

    if (
      !element.classList.contains('e-tbar-btn-text') &&
      !element.classList.contains('e-tbar-btn')
    ) {
      return;
    }

    element = <HTMLElement>(
      (element.tagName === 'BUTTON' ? element.firstElementChild : element)
    );
    this.flag = false;
    let hidden: boolean = element.classList.contains('e-ghidden');
    let classFn: Function = hidden ? removeClass : addClass;
    classFn([element], 'e-ghidden');

    if (hidden) {
      this.treegrid.showColumns(element.innerHTML);
    } else {
      this.treegrid.hideColumns(element.innerHTML);
      //this.treegrid.hideColumns(element.innerHTML);
    }
    this.flag = true;
  }

  public dataBound(): void {
    this.flag = true;
  }
  // Initialize the Dialog component target element.
  // public initilaizeTarget: EmitType<object> = () => {
  //   this.targetElement = this.container.nativeElement.parentElement;
  // };
  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
    this.showEditColumn = false;
  };
  // Enables the footer buttons
  public buttons: Object = [
    {
      click: this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'Submit',
        isPrimary: true,
      },
    },
  ];
  // Initialize the Dialog component's target element.
  initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };

  //Animation options
  public animationSettings: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };

  public showCloseIcon: boolean = true;
  // Hide the Dialog when click the footer button.
  // public hideDialog: EmitType<object> = () => {
  //   this.ejDialog.hide();
  //   this.showEditColumn = false;
  // };

  public saveColumn() {
    if (this.checkNewEdit == 'edit') {
      console.log('this.checkNewEdit:', this.checkNewEdit);
      this.listHeadersC.forEach((a) => {
        delete a['customAttributes'];
      });
      // var colorP = 'yellow';
      var catched = false;
      let b = [];
      // myArray.forEach(val => myClonedArray.push(Object.assign({}, val)));
      this.listHeadersC.forEach((r) => {
        if (!catched) {
          catched = true;
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
          document.body.append(style);
        }

        if (r.field == this.columnField) {
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r.minWidth = this.ColMinWidth;
          r['customAttributes'] = { class: 'cssClassaa' };
        }
        b.push(Object.assign({}, r));
      });
      console.log('------listHeadersC-------:', this.listHeadersC);
      // console.log("this.listHeadersC.map((object) => ({ ...object })) bbbbbbbbbbbbbb:",b);
      this.treeColumns=[];
      console.log("tre",this.treeColumns)
      // this.treegrid.refreshColumns();
      // let c=this.listHeadersC.map((object) => ({ ...object }));
      console.log('------b-------:', b);
      //  let g=this.listHeadersC;
      //  console.log("g:",g)
      this.treeColumns = [...this.listHeadersC]; //this.listHeadersC;
      console.log('------[this.treeColumns]-------:', this.treeColumns);

      this.textWrap = this.ColChecked;
      this.treegrid.refreshColumns();
    }
    if (this.checkNewEdit == 'add') {
      // var column: any = { field: this.ColName, headerText: this.ColName, width: this.ColMinWidth, };
      // this.treeColumns.push(column);
      this.listHeadersC.forEach((a) => {
        delete a['customAttributes'];
      });

      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
      document.body.append(style);
      this.listHeadersC.push({
        field: this.ColName,
        headerText: this.ColName,
        type: this.ColType,
        textAlign: this.ColAlign,
        minWidth: this.ColMinWidth,
        customAttributes: { class: 'cssClassaa' },
      });

      // const b = this.listHeadersC.map((object) => ({ ...object }));

      // this.treeColumns = b;
      this.treeColumns = [];
      this.treeColumns = this.listHeadersC;

      this.textWrap = this.ColChecked;
      this.treegrid.refreshColumns();
      // console.log("AddColumn:", this.treeColumns);
      // this.treegrid.refreshColumns();
    }

    this.showEditColumn = false;

    this.ejDialog.hide();
    //  this.hideDialog();

    this.treegrid.refreshColumns();
  }
  public btnclick = function (): void {
    this.ejDialog.hide();

    this.showEditColumn = false;
  };

  // Sample level code to handle the button click action
  public onOpenDialog = function (event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };
  public onOpenDialog = function (): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };
  public onChange(e: ChangeEventArgs): void {
    let columnName: string = <string>e.value;
    if (columnName === 'price') {
      this.dropdown2.dataSource = this.d2data;
      this.dropdown2.value = 'n2';
    }
    if (columnName === 'orderDate') {
      this.dropdown2.dataSource = this.d3data;
      this.dropdown2.value = 'M/d/yyyy';
    }
    //  this.dropdown2.index = 0;
  }

  // public changeMinWidth(e: ChangeEventArgs): void {
  //   let val: any = <string>e.value;

  //   this.treegrid.getColumnByField(this.columnField).minWidth = val;
  // }
  public changeFontColor(e: ChangeEventArgs): void {
    this.ColFColor = <string>e.value;

    // this.listHeadersC.forEach((a) => {
    //   delete a['customAttributes'];
    // });
    // var colorP = 'yellow';
    // var catched = false;
    // this.listHeadersC.forEach((r) => {
    //   if (!catched) {
    //     catched = true;
    //     var style = document.createElement('style');
    //     style.type = 'text/css';
    //     style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { color: ${val}; }`;
    //     document.body.append(style);
    //   }

    //   if (r.field == this.columnField) {
    //     r['customAttributes'] = { class: 'cssClassaa' };
    //   }
    // });
    // const b = this.listHeadersC.map((object) => ({ ...object }));

    // this.treeColumns = b;
  }
  // public changeFontSize(e: ChangeEventArgs): void {
  //   let val: any = <string>e.value;
  //   this.listHeadersC.forEach((a) => {
  //     delete a['customAttributes'];
  //   });
  //   var catched = false;
  //   this.listHeadersC.forEach((r) => {
  //     if (!catched) {
  //       catched = true;
  //       var style = document.createElement('style');
  //       style.type = 'text/css';
  //       style.innerHTML = `.e-treegrid .e-headercell.cssClassaa {  font-size: ${val};}`;
  //       document.body.append(style);
  //     }

  //     if (r.field == this.columnField) {
  //       r['customAttributes'] = { class: 'cssClassaa' };
  //     }
  //   });

  //   const b = this.listHeadersC.map((object) => ({ ...object }));

  //   this.treeColumns = b;
  // }
  public changeBackground(e: ChangeEventArgs): void {
    this.ColBColor = <string>e.value;

    // this.listHeadersC.forEach((a) => {
    //   delete a['customAttributes'];
    // });
    // var colorP = 'yellow';
    // var catched = false;
    // this.listHeadersC.forEach((r) => {
    //   if (!catched) {
    //     catched = true;
    //     var style = document.createElement('style');
    //     style.type = 'text/css';
    //     style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${val}; }`;
    //     document.body.append(style);
    //   }

    //   if (r.field == this.columnField) {
    //     r['customAttributes'] = { class: 'cssClassaa' };
    //   }
    // });

    // const b = this.listHeadersC.map((object) => ({ ...object }));

    // this.treeColumns = b;
  }
  // public changeAlig(e: ChangeEventArgs): void {
  //   let val: any = <string>e.value;
  //   this.treegrid.getColumnByField(this.columnField).textAlign = val;

  //   // this.treegrid.refreshColumns();
  // }
  // public change(e: ChangeEventArgs): void {
  //   let val: any = <string>e.value;

  //   this.treegrid.getColumnByField(this.columnField).type = val;

  //   this.treegrid.refreshColumns();
  // }
  public checkboxChange(e: any): void {
    if (e.checked) {
      this.textWrap = true;
    } else {
      this.textWrap = false;
    }
    this.treegrid.refreshColumns();
  }
  rowSelected(args) {
    this.selectedRow = args;
  }
  copy() {
    this.copiedRow = this.treegrid.getRowByIndex(this.rowIndex);

    // console.log('copy:', this.selectedRow.row);
    // this.selectedRow.setAttribute('style', 'background:#FFFF00;');
    // this.selectedRow.style.background = '#FFFF00';
    this.treegrid.copyHierarchyMode = 'None';
    this.treegrid.copy();
    this.copiedRow.setAttribute('style', 'background:#FFC0CB;');
    // this.treegrid.startEdit();
    // this.selectedRow.row.classList.add('copied');
    // console.log(
    //   'classList:',
    //   this.selectedRow.row
    // (this.selectedRow as HTMLElement).classList.add('copied')
    // );
    // (this.selectedRow as HTMLElement).classList.add('copied');
    // this.selectedRow.style.background = '#FFC0CB';
    // this.selectedRow.setAttribute('style', 'background:#FFC0CB;');

    // this.selectedRow.row.style.background = '#FFC0CB';
    // this.treegrid.rowTemplate.refresh(this.selectedRow);

    // console.log(this.selectedRow.row.classList.contains('copied'));
    // this.rowBound(this.selectedRow);
    // '#FFC0CB';
  }
  // private createTreeGridColumns(customAtt) {
  //   this.listHeaders.forEach((r) => {
  //     if (r.field == this.columnField) {
  //       r.customAttributes = customAtt;
  //     }
  //   });
  //   return this.listHeaders;
  // }
  delete(): void {
    const selectedRow: number = this.treegrid.getSelectedRowIndexes()[0];
    if (this.treegrid.getSelectedRowIndexes().length) {
      (this.treegrid.dataSource as object[]).splice(selectedRow, 1);
    } else {
      alert('No records selected for delete operation');
    }
    this.treegrid.refresh();
  }

/************************** Multi Sort ********************/
public onClick1(e: MouseEvent): void {
  if (this.taskNameM.checked) {
      this.treegrid.sortByColumn('TaskName', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('TaskName');
  }

}
public onClick2(e: MouseEvent): void {
  if (this.durationM.checked) {
      this.treegrid.sortByColumn('Duration', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('Duration');
  }

}
public onClick3(e: MouseEvent): void {
  if (this.startDateM.checked) {
      this.treegrid.sortByColumn('StartDate', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('StartDate');
  }

}
public onClick4(e: MouseEvent): void {
  if (this.endDateM.checked) {
      this.treegrid.sortByColumn('EndDate', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('EndDate');
  }

}
public onClick5(e: MouseEvent): void {
  if (this.priorityM.checked) {
      this.treegrid.sortByColumn('Priority', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('Priority');
  }

}
public onClick6(e: MouseEvent): void {
  if (this.progressM.checked) {
      this.treegrid.sortByColumn('Progress', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('Progress');
  }

}

// public sort (args: SortEventArgs ): void {
//   if (args.requestType === 'sorting') {
//       for (let columns of this.treegrid.getColumns()) {
//           for (let sortcolumns of this.treegrid.sortSettings.columns) {
//               if (sortcolumns.field === columns.field) {
//                   this.check(sortcolumns.field, true); break;
//               } else {
//                   this.check(columns.field, false);
//               }
//           }
//       }
//   }

// }
public check(field: string, state: boolean): void {
  switch (field) {
      case 'TaskName':
          this.taskNameM.checked = state; break;
      case 'Duration':
          this.durationM.checked = state; break;
      case 'StartDate':
          this.startDateM.checked = state; break;
      case 'EndDate':
          this.endDateM.checked = state; break;
      case 'Priority':
          this.priorityM.checked = state; break;
      case 'Progress':
          this.progressM.checked = state; break;
  }
}




  // rowBound(args: RowDataBoundEventArgs) {
  //   // if (args.row == this.copiedRow) {
  //   //   args.row.style.background = '#FFFF00';
  //   // }
  //   console.log('copied inside', args.row.classList.contains('copied'));
  //   if (args.row.classList.contains('copied')) {
  //     console.log('copied inside');
  //     // (args.row as HTMLElement).style.background = 'green';
  //     args.row.setAttribute('style', 'background:#FFC0CB;');
  //     args.row.style.background = '#FFC0CB';
  //   }
  // }
}
export interface ITaskModel {
  TaskID?: number;
  TaskName?: string;
  StartDate?: Date;
  EndDate?: Date;

  Duration?: number;
  Progress?: number;
  Priority?: string;
}
