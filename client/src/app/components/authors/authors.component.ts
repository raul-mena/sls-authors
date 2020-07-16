import { Component, OnInit } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorModel } from 'src/app/models/author.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {

  items: Array<AuthorModel> = [];
  closeResult = '';
  authorForm: FormGroup;

  constructor(
    public authorService: AuthorsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initForm()
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

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  initForm() {
    this.authorForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', [Validators.required])
    });
  }

  setAuthor(item: AuthorModel, content) { 
    this.authorForm.setValue({...item});
    this.open(content);
  }

  save() {
    if( this.authorForm.valid){
      if(this.authorForm.value.id){
        this.authorService.updateAuthor(this.authorForm.value).subscribe((data: AuthorModel) => {
          const index = this.items.findIndex(x => x.id === data.id);
          this.items[index] = data;
          this.closeAndReset();
        });
      } else {
        this.authorService.save(this.authorForm.value).subscribe((data: AuthorModel) => {
          this.items.push(data);
          this.closeAndReset();
        });
      }
    }
  }

  private closeAndReset() {
    this.initForm();
    this.modalService.dismissAll();
    Swal.fire(
      'Good job!',
      'Author saved!',
      'success'
    )
  }

  delete(item: AuthorModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!, also all publications will be removed as well",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const { id } = item;
        this.authorService.deleteAuthor(id).subscribe(data => {
          const index = this.items.findIndex(x => x.id === id);
          this.items.splice(index, 1);
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }
}
