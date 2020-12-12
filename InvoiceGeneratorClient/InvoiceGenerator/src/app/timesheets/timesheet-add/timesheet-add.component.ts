import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.css']
})
export class TimesheetAddComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onSave() {

  }

  onCancel() {
    // TODO: Dialog 'are you sure?' if form was changed
    this.navigateOneStepUp();
  }

  navigateOneStepUp() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
