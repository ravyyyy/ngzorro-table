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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        bookTitle: book.title,
      },
      queryParamsHandling: 'merge'
    })
  }

  handleOk(): void {
    const newBook: Book = {
      title: this.title.value,
      year: this.year.value,
      author: this.author.value,
      genre: this.genre.value
    };

    this.booksList.push(newBook);
    this.booksService.booksListSubject.next(this.booksList);

    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  showModal(): void {
    this.isModalVisible = true;
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
