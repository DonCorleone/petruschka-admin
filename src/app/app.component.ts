import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { appInterceptor } from './app.interceptor';
import { AppUtilityService } from './app-utility.service';
import { FeatureModuleService } from './feature-module.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DonCorleoneFormFieldComponent } from './__shared-utilities/don-corleone-form-field/don-corleone-form-field.component';
import { DonCorleoneTableComponent } from './don-corleone-table/don-corleone-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, FormsModule, ReactiveFormsModule, DonCorleoneFormFieldComponent, DonCorleoneTableComponent, HttpClientModule, MatNativeDateModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  is_loader_showing: boolean = false;
  loading_animation_control_sub!: Subscription;
  table_config = {
    columns: [
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
        numeric: true
      }
    ],
    primary_key_set: ['a'],
    default_data: DUMMY_TABLE_DATA,
    table_data_changer: new Subject<any>(),
    ediTable: {
      edit: true
    }
  };

  // for table update form
  is_table_being_updated: boolean = false;
  is_new_row_being_added: boolean = false;
  table_update_form!: FormGroup;
  existing_row_values!: any;

  // for table update API call
  private update_table_data_sub!: Subscription;

  constructor(
    private global_utilities: AppUtilityService,
    private feature_module_utilities: FeatureModuleService
  ) {
    this.table_update_form = new FormGroup({
      a: new FormControl('', [Validators.required]),
      b: new FormControl('', []),
      c: new FormControl('', [])
    });
  }
  ngAfterViewInit(): void {
    let loader_control = this.global_utilities.getGlobalData('loading_animation_control');
    this.loading_animation_control_sub = loader_control.subscribe(
      (to_show: any) => {
        // Show if the loader is not being shown already
        if (to_show && !this.is_loader_showing) {
          this.is_loader_showing = true;
        }
        // Hide if the loader is being shown and there is no ongoing service call in next few seconds
        if (!to_show && this.is_loader_showing) {
          let ongoing_call_check_interval = setInterval(
            () => {
              let ongoing_call_count = this.global_utilities.getGlobalData('ongoing_request_count');
              if (ongoing_call_count == 0) {
                this.is_loader_showing = false;
                clearInterval(ongoing_call_check_interval);
              }
            }, 1000
          );
        }
      }
    );

  }

  ngOnInit(): void {
  }

  addNewRow() {
    // enabling the primary key fields
    this.global_utilities.toggleFormControls(this.table_update_form, this.table_config.primary_key_set, true);
    // to reset the entire form
    this.table_update_form.reset();
    this.is_table_being_updated = true;
    this.is_new_row_being_added = true;
  }

  editRow(row: any) {
    this.existing_row_values = { ...row };
    // to reset the entire form
    this.table_update_form.reset();
    // patch existing values in the form
    this.table_update_form.patchValue(row);
    // disabling the primary key fields
    this.global_utilities.toggleFormControls(this.table_update_form, this.table_config.primary_key_set, false);
    this.is_table_being_updated = true;
    this.is_new_row_being_added = false;
  }

  updateTableData() {
    let updated_row_data = (this.is_new_row_being_added) ? { ...this.table_update_form.value } : { ...this.existing_row_values, ...this.table_update_form.value };

    this.update_table_data_sub = this.feature_module_utilities.updateTableData(updated_row_data, this.is_new_row_being_added).subscribe(
      (table_data) => {
        //close the drawer and reset the update form
        this.is_table_being_updated = false;
        this.table_update_form.reset();
        //update the table with latest values
        this.table_config.table_data_changer.next({
          data: table_data,
          highlight: updated_row_data
        });
      },
      (error) => {
        this.global_utilities.showSnackbar();
      }
    );
  }

  ngOnDestroy(): void {
    this.global_utilities.unsubscribeAll([
      this.update_table_data_sub
    ]);
  }


}

const DUMMY_TABLE_DATA: any[] = [
  { a: 'Dummy1', b: 'Data String 1', c: 21 },
  { a: 'Dummy2', b: 'Data String 2', c: 22 },
  { a: 'Dummy3', b: 'Data String 3', c: 23 },
  { a: 'Dummy4', b: 'Data String 4', c: 24 },
  { a: 'Dummy5', b: 'Data String 5', c: 25 },
  { a: 'Dummy6', b: 'Data String 6', c: 26 },
  { a: 'Dummy7', b: 'Data String 7', c: 27 },
  { a: 'Dummy8', b: 'Data String 8', c: 28 },
  { a: 'Dummy9', b: 'Data String 9', c: 29 },
  { a: 'Dummy10', b: 'Data String 10', c: 30 },
  { a: 'Dummy11', b: 'Data String 11', c: 31 },
  { a: 'Dummy12', b: 'Data String 12', c: 32 },
  { a: 'Dummy13', b: 'Data String 13', c: 33 },
  { a: 'Dummy14', b: 'Data String 14', c: 34 },
  { a: 'Dummy15', b: 'Data String 15', c: 35 },
  { a: 'Dummy16', b: 'Data String 16', c: 36 },
  { a: 'Dummy17', b: 'Data String 17', c: 37 },
  { a: 'Dummy18', b: 'Data String 18', c: 38 },
  { a: 'Dummy19', b: 'Data String 19', c: 39 },
  { a: 'Dummy20', b: 'Data String 20', c: 40 },
];
