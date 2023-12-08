import { Subject } from "rxjs";

table_config = {
    // the "columns" property is mandatory
    columns:  [
      {
        key: 'a',
        heading: 'Column A'
      },
      {
        key: 'b',
        heading: 'Column B'
      },
      {
        key: 'c',
        heading: 'Column C',
        numeric: true // this is optional and to be used if separate styles are needed for numeric columns
      }
    ],
    primary_key_set: ['a'], // this is optional and to be used only if the table is editable
    default_data: DUMMY_TABLE_DATA, // this is optional for setting the initial rows
    table_data_changer: new Subject<any>(), // this is optional and to be used only if the table data needs to be refreshed
    ediTable: { // this is optional
      add: true, // this determines if the "Add New Row" button will be displayed
      edit: true // this determines if the "Edit Row" button will be displayed after each row
    }
  };