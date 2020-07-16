import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { PublicationModel } from 'src/app/models/publication.modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.sass']
})
export class PublicationsComponent implements OnInit {
  idAuthor: string;
  publications: Array<PublicationModel> = [];
  publicationForm: FormGroup;
  count = 0;
  sortingAssending = false;

  constructor(
    public publicationsService: PublicationsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSelectAuthor(id) {
    this.idAuthor = id;
    this.publicationsService.getPublicationByAuthorId(id).subscribe((data: any) => {
      this.publications = data.Items;
      this.sortItems();
      this.count = data.Count;
    });
  }

  save() {
    if(this.publicationForm.valid) {
      this.publicationForm.patchValue({idAuthor: this.idAuthor});
      this.publicationsService.save(this.publicationForm.value).subscribe((data: PublicationModel) => {
        this.publications.push(data);
        this.count++;
        this.closeAndReset();
        Swal.fire(
          'Good job!',
          'Publication added!',
          'success'
        )
      }) 
    }
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  initForm() {
    this.publicationForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      body: new FormControl('', [Validators.required]),
      created: new FormControl('', [Validators.required]),
      idAuthor: new FormControl(''),
    });
  }

  private closeAndReset() {
    this.initForm();
    this.modalService.dismissAll();
  }

  delete(item: PublicationModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const { id } = item;
        this.publicationsService.deletePublication(id).subscribe(data => {
          const index = this.publications.findIndex(x => x.id === id);
          this.publications.splice(index, 1);
          this.count--;
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }

  sortItems() {
    if(this.sortingAssending) {
      this.publications.sort((a: any, b: any) => {
        if (a.created > b.created) {
          return -1;
        }
        if (b.created > a.created) {
            return 1;
        }
        return 0;
      })
    } else {
      this.publications.sort((a: any, b: any) => {
        if (a.created > b.created) {
          return 1;
        }
        if (b.created > a.created) {
            return -1;
        }
        return 0;
      })
    }
    this.sortingAssending = !this.sortingAssending;
  }
}
