import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthorModel } from 'src/app/models/author.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.sass']
})
export class AuthorsListComponent implements OnInit {
  items: Array<AuthorModel> = [];
  @Output() authorSelected: EventEmitter<string> = new EventEmitter();

  constructor(
    public authorService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.authorService.getAll().subscribe((authors: Array<AuthorModel>) => {
      this.items = authors;
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, please try again',
      })
      console.log('error here.....', err)
    })
  }

  selectAuthor(id) {
    this.authorSelected.emit(id);
  }
}
