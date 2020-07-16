import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationsComponent } from './publications.component';
import { AuthorsListModule } from '../authors-list/authors-list.module';
import { PublicationsRoutingModule } from './publications.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PublicationsComponent],
  imports: [
    CommonModule,
    AuthorsListModule,
    PublicationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicationsModule { }
