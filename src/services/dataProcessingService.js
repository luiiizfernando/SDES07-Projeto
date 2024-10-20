import fetch from 'node-fetch';
import { listBooks, searchBook } from '../services/googleBookService.js';

export async function dataBooks() {
  const books = await listBooks();
  return books;
}

export async function searchDataBooks(isbn) {
  const book = await searchBook(isbn);
  return book;
}