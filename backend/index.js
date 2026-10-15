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
//Consulta de ligas por fecha a API

app.get('/api/leagues/date/:date', async (request, response) => {
  const date = request.params.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    return response.status(400).json({ error: 'La fecha debe tener el formato YYYY-MM-DD.' });
  }

  const params = new URLSearchParams({
    api_token: token,
    include: 'today.scores;today.group;today.participants;today.round;today.stage'
  });

  try {
    const sportmonksResponse = await fetch(
      `https://api.sportmonks.com/v3/football/leagues/date/${date}?${params}`
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
