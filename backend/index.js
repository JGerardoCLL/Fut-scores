import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const token = process.env.SPORTMONKS_TOKEN;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET']
}));

if (!token) {
  throw new Error('Falta configurar SPORTMONKS_TOKEN en backend/.env');
}

app.get('/api/teams', async (_request, response) => {
  const params = new URLSearchParams({
    api_token: token,
    include: 'upcoming.participants;upcoming.league'
  });

  try {
    const sportmonksResponse = await fetch(
      `https://api.sportmonks.com/v3/football/teams?${params}`
    );

    if (!sportmonksResponse.ok) {
      return response.status(sportmonksResponse.status).json({
        error: 'Sportmonks no pudo completar la petición.'
      });
    }

    const data = await sportmonksResponse.json();
    return response.json(data);
  } catch {
    return response.status(502).json({
      error: 'No fue posible conectarse con Sportmonks.'
    });
  }
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
