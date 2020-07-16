import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorsRoutingModule } from './authors.routing';

@NgModule({
  declarations: [
    AuthorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
