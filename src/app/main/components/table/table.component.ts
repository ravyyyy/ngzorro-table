import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  booksList!: Book[];
  isModalVisible: boolean = false;
  bookForm!: FormGroup;
  isEditModalVisible: boolean = false;
  editBookForm!: FormGroup;
  actualTitle!: string;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((res) => {
      console.log(res);
    });

    this.booksService.booksListSubject.subscribe((res) => {
      this.booksList = [...res];
      console.log('in subscribe ');
    });
  }

  ngOnInit(): void {
      this.booksList = this.booksService.books;
      this.initializeForm();
      console.log(this.booksList);
  }

  initializeEditForm(book: Book): void {
    this.editBookForm = new FormGroup({
      title: new FormControl(book.title, [Validators.required]),
      year: new FormControl(book.year, [Validators.required]),
      author: new FormControl(book.author, [Validators.required]),
      genre: new FormControl(book.genre, [Validators.required])
    });
  }

  initializeForm(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required])
    });
  }

  add() {
    this.showModal();
  }

  delete(book: Book) {
    const index = this.booksList.indexOf(book);
    if (index !== -1) {
      this.booksList.splice(index, 1);
      this.booksService.booksListSubject.next(this.booksList);
    }
  }

  edit(book: Book) {
    this.showEditModal();
    this.actualTitle = book.title;
    this.initializeEditForm(book);
  }

  handleOk(): void {
    if(this.bookForm.valid) {
      const newBook: Book = {
        title: this.title.value,
        year: this.year.value,
        author: this.author.value,
        genre: this.genre.value
      };

      this.booksList.push(newBook);
      this.booksService.booksListSubject.next(this.booksList);
    }

    this.isModalVisible = false;
  }

  handleEditOk(): void {
    if (this.editBookForm.valid) {
      const editedBook: Book = {
        title: this.editBookForm.get('title')?.value,
        year: this.editBookForm.get('year')?.value,
        author: this.editBookForm.get('author')?.value,
        genre: this.editBookForm.get('genre')?.value
      };

      const index = this.booksList.findIndex(book => book.title === this.actualTitle);
    
      if(index !== -1) {
        this.booksList[index] = editedBook;
        this.booksService.booksListSubject.next(this.booksList);
      }
    }

    this.isEditModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleEditCancel(): void {
    this.isEditModalVisible = false;
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  showEditModal(): void {
    this.isEditModalVisible = true;
  }

  get title(): FormControl {
    return this.bookForm.get('title') as FormControl;
  }

  get year(): FormControl {
    return this.bookForm.get('year') as FormControl;
  }

  get author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }

  get genre(): FormControl {
    return this.bookForm.get('genre') as FormControl;
  }
}
