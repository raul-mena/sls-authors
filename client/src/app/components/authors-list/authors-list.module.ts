import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsListComponent } from './authors-list.component';



@NgModule({
  declarations: [AuthorsListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AuthorsListComponent
  ]
})
export class AuthorsListModule { }
