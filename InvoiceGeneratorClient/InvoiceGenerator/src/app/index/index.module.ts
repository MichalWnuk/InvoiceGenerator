import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: IndexComponent }
    ]),
    SharedModule
  ]
})
export class IndexModule { }
