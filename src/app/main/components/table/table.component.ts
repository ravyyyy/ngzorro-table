import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  booksList!: Book[];

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
      console.log(this.booksList);
  }

  add() {
    this.booksService.addBook();
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
}
