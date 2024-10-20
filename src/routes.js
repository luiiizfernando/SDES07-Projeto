import express from 'express';
import { fetchGoogleBookReviewsByIsbns } from './services/googleBookService.js';
import { fetchNytAllBestSellers, fetchAllIsbnsFromNytLists, fetchAllFromNytLists } from './services/newYorkTimesService.js';
import { dataBooks, searchDataBooks } from './services/dataProcessingService.js';

const router = express.Router();

// Route to populate the database with books from Google Books API
router.get('/create-book', async (req, res) => {
  try {
    let booksFormated = await dataBooks();
    res.json(booksFormated);
  } catch (err) {
    res.status(500).json({ error: 'Erro: ' + err });
  }
});

// Route to populate the database with NYT lists from NYT Books API
router.get("/create-lists", async (req, res) => {
  const nytLists = await fetchNytAllBestSellers();
  const lists = nytLists.results.filter(value => JSON.stringify(value) !== '{}');
  res.json(lists);
});

// Route to populate the database with the association of list from NYT Books API with books from Google Books API
router.get("/create-books-list", async (req, res) => {
  const booksOfList = await fetchAllFromNytLists();
  res.json(booksOfList);
});

router.get("/create-reviews", async (req, res) => {
  // Consultar do reviews com base nos livros do db
});

router.get('*', (req, res) => {
  res.status(404).json({ error: 'Página não encontrada!' });
});

export default router;
