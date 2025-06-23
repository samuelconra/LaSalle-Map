const express = require('express');
const cors = require('cors');
const pool = require('./db/config_db');
const app = express();

const HOST = 'localhost';
const PORT = 3000; 

app.use(cors());

app.get('/routes', async (req, res) => {
    const { source } = req.query;
    let targets = req.query.target;

    if (!Array.isArray(targets)) {
        targets = [targets];
    }

    const placeholders = targets.map((_, i) => `$${i + 2}`).join(', ');

    try {
        const result = await pool.query(`
            SELECT dj.seq, dj.node, dj.edge, dj.cost, ST_AsGeoJSON(c.geom) AS geojson
            FROM pgr_dijkstra(
                'SELECT id, source, target, cost, cost AS reverse_cost FROM Roads',
                $1::INTEGER,
                ARRAY[${placeholders}]::INTEGER[],
                false::BOOLEAN
            ) AS dj
            JOIN Roads c ON dj.edge = c.id
            ORDER BY dj.seq;
        `, [source, ...targets.map(Number)]);

        const geojson = {
            type: "FeatureCollection",
            features: result.rows.map(row => ({
                type: "Feature",
                geometry: JSON.parse(row.geojson),
                properties: {
                    seq: row.seq,
                    edge: row.edge,
                    cost: row.cost
                }
            }))
        };

        res.json(geojson);
    } catch (err) {
        console.error('Error en /routes:', err);
        res.status(500).json({ error: 'Error al calcular la ruta' });
    }
});



app.get('/places', async (req, res) => {
  const result = await pool.query(`
    SELECT id, name, type, careers, building, description, classrooms, floors, ST_AsGeoJSON(coordinates) AS geom FROM Places;
  `);

  const geojson = {
    type: "FeatureCollection",
    features: result.rows.map(row => ({
        type: "Feature",
        geometry: JSON.parse(row.geom),
        properties: { 
            id: row.id, 
            name: row.name,
            type: row.type,
            careers: row.careers,
            building: row.building,
            description: row.description,
            classrooms: row.classrooms,
            floors: row.floors,
        }
    }))
  };
  res.json(geojson);
});

app.get('/roads', async (req, res) => {
  const result = await pool.query(`
    SELECT id, source, target, cost, ST_AsGeoJSON(geom) AS geom FROM Roads;
  `);
  
  const geojson = {
    type: "FeatureCollection",
    features: result.rows.map(row => ({
        type: "Feature",
        geometry: JSON.parse(row.geom),
        properties: { 
            id: row.id, 
            source: row.source,
            target: row.target,
            cost: row.cost,
        }
    }))
  };
  res.json(geojson);
});

app.get('/zones', async (req, res) => {
  const result = await pool.query(`
    SELECT id, name, type, description, ST_AsGeoJSON(geom) AS geom FROM Zones;
  `);
  
  const geojson = {
    type: "FeatureCollection",
    features: result.rows.map(row => ({
        type: "Feature",
        geometry: JSON.parse(row.geom),
        properties: { 
            id: row.id, 
            name: row.name,
            type: row.type,
            description: row.description,
        }
    }))
  };
  res.json(geojson);
});

app.listen(PORT, () => console.log(`Server in http://${HOST}:${PORT}`));