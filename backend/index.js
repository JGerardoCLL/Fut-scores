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

app.get('/api/teams/:id', async (request, response) => {

  const teamId = Number(request.params.id);
  if (!Number.isInteger(teamId) || teamId <= 0) {
    return response.status(400).json({ error: 'El ID del equipo no es válido.' });
  }

  const params = new URLSearchParams({
    api_token: token,
    include: 'upcoming.participants;upcoming.league'
  });

  //llamada a sportmonks con la ruta incluyendo id y token
  try {
    const sportmonksResponse = await fetch(
      `https://api.sportmonks.com/v3/football/teams/${teamId}?${params}`
    );

    if (!sportmonksResponse.ok) {
      return response.status(sportmonksResponse.status).json({
        error: 'Sportmonks no pudo completar la petición.'
      });
    }

    //respuesta
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
