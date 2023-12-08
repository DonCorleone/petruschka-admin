import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-don-corleone-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './don-corleone-dialog.component.html',
  styleUrl: './don-corleone-dialog.component.scss'
})
export class DonCorleoneDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
