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

import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
} from '@angular/forms';
import {
  DataManager,
  WebApiAdaptor,
  Query,
  ReturnOption,
} from '@syncfusion/ej2-data';

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
  
  public isModal: boolean = true;
  public data: Object[] = [];
  public dm: DataManager;
  public editSettings: EditSettingsModel;
  
  public selectOptions: Object;
  

  public format: Object;
  public fields: Object;
  public selectedRow: any;
  public copiedRow: any;
  public pageSetting: Object;
  public ColType: string = '';

  checkNewEdit: string;
  public rowIndex: number;


  public formatOptions: Object;
  public editOptions: Object;
  public stringRule: Object;
  public taskidRule: Object;
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
  public sorting: boolean = false;
  public filtering: boolean = false;
  public showChooser: boolean = false;
  public MultiSelect: boolean = false;
  public textWrap: boolean = false;
  public allowResizing: boolean = false;
  public showEditColumn: boolean = false;
  public addNew: boolean = false;
  public ColName: string = '';
  
  public toolbar: string[];
  

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
  public cutRow: any;
  public cutRowBool: boolean = false;

  // public contextMenuItems: any;
  public treeColumns: any;
 
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
 
   
    this.treeColumns = this.listHeaders;
    this.formatOptions = { format: 'M/d/y hh:mm a', type: 'dateTime' };
    
    this.taskidRule = { required: true, number: true };
    this.dateRule = { date: true };
    this.stringRule = { required: true };
    this.dataManager
      .executeQuery(new Query())
      .then((e: ReturnOption) => (this.data = e.result.data as object[]))
      .catch((e) => true);

    this.pageSetting = { pageCount: 3 };



    this.format = { format: 'M/d/yyyy', type: 'date' };

  
  
    
      (this.fields = { text: 'type', value: 'id' });
    this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
    this.contextMenuItems = [
      {
        text: 'Add/Delete/Edit (Dialog)  ',
        target: '.e-content',
        id: 'rndeDialog',
      },
      { text: 'Add/Delete/Edit (Row)  ', target: '.e-content', id: 'rndeRow' },

      ];
    
  }
 
 
  
  actionComplete(args: EditEventArgs) {
  
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

      this.treegrid.endEdit(); //you can save a record by invoking endEdit
    }
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

  
    if (elem.closest('.e-row')) {
      document
        .querySelectorAll('li#rndeDialog')[0]
        .setAttribute('style', 'display: block;');
      document
        .querySelectorAll('li#rndeRow')[0]
        .setAttribute('style', 'display: block;');
      // }
    } else {
     
    }
  }

  contextMenuClick(args): void {
  
   if (args.item.id === 'rndeDialog') {
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
    } 
    
  }


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


  public showCloseIcon: boolean = true;


  public btnclick = function (): void {
    this.ejDialog.hide();

    this.showEditColumn = false;
  };

  // Sample level code to handle the button click action
  public onOpenDialog = function (event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  rowSelected(args) {
    this.selectedRow = args;
  }

}

