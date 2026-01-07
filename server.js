const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// middleware parsing form
app.use(express.urlencoded({ extended: true }));

// folder public
app.use(express.static("public"));

// route GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// route POST /contact (WAJIB ADA)
app.post("/contact", (req, res) => {
  const { name, email, nohp, message } = req.body;

  if (!name || name.length < 3) {
    return res.status(400).send("Nama minimal 3 karakter");
  }

  if (!message || message.length < 10) {
    return res.status(400).send("Pesan minimal 10 karakter");
  }

  res.send(`
    Terima kasih ${name}<br>
    Email: ${email}<br>
    No HP: ${nohp}<br>
    Pesan Anda: ${message}<br>
    <b>telah diterima</b>
  `);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});