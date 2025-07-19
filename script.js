// server.js
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!ytdl.validateURL(url)) {
    return res.status(400).send('Invalid URL');
  }

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;

  res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

  ytdl(url, { format: 'mp4' }).pipe(res);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});