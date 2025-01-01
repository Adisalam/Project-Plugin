import express from "express";
import dotenv from "dotenv";
import registerRouter from "./routes/registerRoutes";
import loginRouter from "./routes/loginRoutes";

const app = express();

dotenv.config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send({Nama: "Hidayatul Fajriyah"});
});

app.use("/auth/register", registerRouter)
app.use("/auth/login", loginRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
}) 

// POST untuk membuat buku baru
app.post('/post_books', async (req, res) => {
    const { title, authorId, genreId } = req.body;
  
    try {
      const newBook = await prisma.book.create({
        data: {
          title,
          authorId,
          genreId,
        },
      });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create book' });
    }
});

// POST untuk membuat author id sama genre id
app.post('/authors', async (req, res) => {
    const { name } = req.body;
  
    try {
      const newAuthor = await prisma.author.create({
        data: {
          name,
        },
      });
      res.status(201).json(newAuthor);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Failed to create author', details: error.message });
    }
  });

  app.post('/genres', async (req, res) => {
    const { name } = req.body;
  
    try {
      const newGenre = await prisma.genre.create({
        data: {
          name,
        },
      });
      res.status(201).json(newGenre);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Failed to create genre', details: error.message });
    }
  }); 
  
  app.get('/get_books', async (req, res) => {
    try {
        const books = await prisma.book.findMany({
            include: {
                author: true,
                genre: true,
            },
        });
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET untuk menampilkan atau memanggil buku by id lewat json input
app.post('/get_byid_books', async (req, res) => {
    const { id } = req.body; 

    try {
        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                genre: true,
            },
        });

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
