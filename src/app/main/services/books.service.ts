import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksList: Book[] = [
    { title: 'Into the Wild', year: 1997, author: 'Jon Kraukauer', genre: 'Biography'},
    { title: 'Mr. Penumbra s 24-Hour Bookstore', year: 2013, author: 'Robin Sloan', genre: 'Realistic Fiction'},
    { title: 'Tell the Wolves I m Home', year: 2013, author: 'Carol Rifka Brunt', genre: 'Realistic Fiction'},
    { title: 'The Shadow of the Wind', year: 2005, author: 'Carlos Ruis Zafon', genre: 'Mystery/Horror'},
    { title: 'Sharp Objects', year: 2007, author: 'Gillian Flynn', genre: 'Mystery/Horror'},
    { title: 'The Road', year: 2006, author: 'Cormac McCarthy', genre: 'Mystery/Horror'},
    { title: 'The Bride Collector', year: 2011, author: 'Ted Dekker', genre: 'Mystery/Horror'},
    { title: 'The Liars Club', year: 2005, author: 'Mary Karr', genre: 'Memoir'},
    { title: 'The Glass Castle', year: 2006, author: 'Jeannette Walls', genre: 'Memoir'},
    { title: 'Same Kind of Different', year: 2006, author: 'Ron Hall', genre: 'Memoir'},
    { title: 'Smoke Gets in Your Eyes: and Other Lessons from the Crematory', year: 2014, author: 'Caitlin Doughty', genre: 'Memoir'},
    { title: 'Brain on Fire', year: 2013, author: 'Susannah Cahalan', genre: 'Psychology/Memoir'},
    { title: 'Girl, Interrupted', year: 1994, author: 'Susanna Kaysen', genre: 'Psychology/Memoir'},
    { title: 'Darkness Visible', year: 1992, author: 'William Styron', genre: 'Psychology/Memoir'},
    { title: 'California', year: 2014, author: 'Edan Lepucki', genre: 'Dystopia'},
    { title: 'We', year: 1983, author: 'Yevgeny Zamyatin', genre: 'Dystopia'},
    { title: 'Black (series)', year: 2009, author: 'Ted Dekker', genre: 'Science Fiction/Fantasy'},
    { title: 'Black Moon', year: 2015, author: 'Kenneth Calhoun', genre: 'Science Fiction/Fantasy'},
    { title: 'The Bone Clocks', year: 2014, author: 'David Mitchell', genre: 'Science Fiction/Fantasy'},
    { title: 'The Graveyard Book', year: 2010, author: 'Neil Gaiman', genre: 'Science Fiction/Fantasy'},
    { title: 'The Snow Child', year: 2012, author: 'Eowyn Ivey', genre: 'Science Fiction/Fantasy'},
    { title: 'Never Let me Go', year: 2006, author: 'Kazuo Ishiguro', genre: 'Science Fiction/Fantasy'},
    { title: 'Black Water', year: 1993, author: 'Joyce Carol Oates', genre: 'Historical Fiction'},
    { title: 'Libra', year: 1991, author: 'Don DeLillo', genre: 'Historical Fiction'},
    { title: 'Hot Water Music', year: 1983, author: 'Charles Bukowski', genre: 'Short Stories'},
    { title: 'Smoke and Mirrors', year: 2008, author: 'Neil Gaiman', genre: 'Short Stories'},
    { title: 'We Were Liars', year: 2014, author: 'E. Lockhart', genre: 'Young Adult'},
    { title: 'The Fever', year: 2014, author: 'Megan Abbott', genre: 'Young Adult'},
    { title: 'Eleanor & Park', year: 2013, author: 'Rainbow Rowell', genre: 'Young Adult'},
    { title: 'Miss Peregrine s Home for Peculiar Children', year: 2014, author: 'Ransom Riggs', genre: 'Young Adult'}
  ]; // Source of inspiration: https://gentwenty.com/the-best-books-of-every-genre/
  booksListSubject = new Subject<Book[]>();

  constructor() { }

  get books(): Book[] {
    return this.booksList;
  }

  set books(booksToSet: any) {
    this.booksList = booksToSet;
    this.booksListSubject.next(booksToSet);
  }

  deleteBook(book: Book) {
    const index = this.booksList.findIndex(() => book);
    this.booksList.splice(index, 1);
    this.booksListSubject.next(this.booksList);
  }

  addBook() {
    this.booksList.push(this.emptyBook());
    this.booksListSubject.next(this.booksList);
  }

  emptyBook(): Book {
    return {
      title: '-',
      year: 1,
      author: '-',
      genre: '-'
    }
  }
}
