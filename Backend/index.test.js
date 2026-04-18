import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock firebase
const mockGetSongs = jest.fn();
const mockGetMusicBoxes = jest.fn();
const mockGetFilteredSongs = jest.fn();

jest.unstable_mockModule('./firebase.js', () => ({
  getSongs: mockGetSongs,
  getMusicBoxes: mockGetMusicBoxes,
  getFilteredSongs: mockGetFilteredSongs,
}));

jest.unstable_mockModule('./transactions.js', () => ({}));

const { getSongs, getMusicBoxes, getFilteredSongs } = await import('./firebase.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/get/boxes', async (req, res) => {
  try {
    const musicBoxesSnapshot = await getMusicBoxes();
    const musicBoxes = musicBoxesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Sending Music Boxes: ', musicBoxes);
    res.status(200).json(musicBoxes);
  } catch (error) {
    console.log('Error while getting music boxes: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/get/songs', async (req, res) => {
  try {
    const { text } = req.query;
    let songsSnapShot;
    if (!text) {
      songsSnapShot = await getSongs();
    } else {
      songsSnapShot = await getFilteredSongs(
        text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      );
    }
    const songs = songsSnapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Sending songs: ', songs);
    res.status(200).json(songs);
  } catch (error) {
    console.log('Error while getting and filtering songs: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Tests
describe('API REST index.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore?.();
  });

  // GET /get/boxes tests
  describe('GET /get/boxes', () => {
    test('devuelve cajas musicales con status 200', async () => {
      mockGetMusicBoxes.mockResolvedValue({
        docs: [
          { id: '1', data: () => ({ name: 'Box1' }) },
          { id: '2', data: () => ({ name: 'Box2' }) },
        ],
      });

      const res = await request(app).get('/get/boxes');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { id: '1', name: 'Box1' },
        { id: '2', name: 'Box2' },
      ]);
    });

    test('devuelve lista vacía cuando no hay cajas', async () => {
      mockGetMusicBoxes.mockResolvedValue({ docs: [] });
      const res = await request(app).get('/get/boxes');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('devuelve error 500 si falla getMusicBoxes', async () => {
      mockGetMusicBoxes.mockRejectedValue(new Error('Error'));
      const res = await request(app).get('/get/boxes');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Internal server error' });
    });

    test('maneja múltiples solicitudes concurrentes', async () => {
      const mockData = {
        docs: Array.from({ length: 50 }, (_, i) => ({
          id: `box-${i}`,
          data: () => ({ name: `Music Box ${i}`, price: 100 + i })
        }))
      };
      
      mockGetMusicBoxes.mockResolvedValue(mockData);
      
      const concurrentRequests = 5;
      const promises = Array.from({ length: concurrentRequests }, () =>
        request(app).get('/get/boxes')
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(50);
      });
      
      expect(mockGetMusicBoxes).toHaveBeenCalledTimes(concurrentRequests);
    });

    test('maneja documentos sin data válida', async () => {
      mockGetMusicBoxes.mockResolvedValue({
        docs: [
          { id: '1', data: () => null },
          { id: '2', data: () => ({}) },
          { id: '3', data: () => ({ name: 'Valid Box' }) }
        ]
      });
      
      const response = await request(app).get('/get/boxes');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: '1' },
        { id: '2' },
        { id: '3', name: 'Valid Box' }
      ]);
    });

    test('maneja timeout en llamadas a Firebase', async () => {
      mockGetMusicBoxes.mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 100)
        )
      );
      
      const response = await request(app).get('/get/boxes');
      
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal server error' });
    });
  });

  // GET /get/songs sin filtro tests
  describe('GET /get/songs (sin filtro)', () => {
    test('devuelve todas las canciones si no hay parámetro text', async () => {
      mockGetSongs.mockResolvedValue({
        docs: [
          { id: 'a', data: () => ({ title: 'A' }) },
          { id: 'b', data: () => ({ title: 'B' }) },
        ],
      });
      const res = await request(app).get('/get/songs');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(mockGetSongs).toHaveBeenCalledTimes(1);
    });

    test('devuelve lista vacía si no hay canciones', async () => {
      mockGetSongs.mockResolvedValue({ docs: [] });
      const res = await request(app).get('/get/songs');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('devuelve error 500 si getSongs lanza excepción', async () => {
      mockGetSongs.mockRejectedValue(new Error('Error'));
      const res = await request(app).get('/get/songs');
      expect(res.statusCode).toBe(500);
    });

    test('maneja grandes volúmenes de datos', async () => {
      const largeDataset = {
        docs: Array.from({ length: 1000 }, (_, i) => ({
          id: `song-${i}`,
          data: () => ({ 
            title: `Song Title ${i}`, 
            artist: `Artist ${i % 10}`,
            duration: 180 + (i % 60)
          })
        }))
      };
      
      mockGetSongs.mockResolvedValue(largeDataset);
      
      const response = await request(app).get('/get/songs');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1000);
    });

    test('estructura de datos de canciones es consistente', async () => {
      const mockSongs = {
        docs: [
          { 
            id: 'song1', 
            data: () => ({ 
              title: 'Test Song',
              artist: 'Test Artist',
              duration: 180,
              genre: 'Pop',
              album: 'Test Album',
              year: 2023
            }) 
          }
        ]
      };
      
      mockGetSongs.mockResolvedValue(mockSongs);
      
      const response = await request(app).get('/get/songs');
      
      expect(response.status).toBe(200);
      expect(response.body[0]).toMatchObject({
        id: 'song1',
        title: 'Test Song',
        artist: 'Test Artist',
        duration: 180,
        genre: 'Pop',
        album: 'Test Album',
        year: 2023
      });
    });
  });

  // GET /get/songs con filtro tests
  describe('GET /get/songs (con filtro)', () => {
    test('llama a getFilteredSongs con texto normalizado', async () => {
      mockGetFilteredSongs.mockResolvedValue({
        docs: [{ id: '1', data: () => ({ title: 'Filtrada' }) }],
      });

      const res = await request(app).get('/get/songs?text=Canción');
      expect(mockGetFilteredSongs).toHaveBeenCalledWith('cancion');
      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toEqual({ id: '1', title: 'Filtrada' });
    });

    test('ignora acentos, mayúsculas y espacios extra', async () => {
      mockGetFilteredSongs.mockResolvedValue({
        docs: [{ id: 'x', data: () => ({ title: 'Normalizado' }) }],
      });

      const res = await request(app).get('/get/songs?text=  ÁRbol ');
      expect(mockGetFilteredSongs).toHaveBeenCalledWith('  arbol');
      expect(res.statusCode).toBe(200);
    });

    test('devuelve lista vacía si no hay coincidencias', async () => {
      mockGetFilteredSongs.mockResolvedValue({ docs: [] });
      const res = await request(app).get('/get/songs?text=nada');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('devuelve 500 si falla getFilteredSongs', async () => {
      mockGetFilteredSongs.mockRejectedValue(new Error('Error'));
      const res = await request(app).get('/get/songs?text=falla');
      expect(res.statusCode).toBe(500);
    });

    test('funciona cuando getFilteredSongs devuelve null/undefined', async () => {
      mockGetFilteredSongs.mockResolvedValue(null);
      
      const response = await request(app).get('/get/songs?text=test');
      
      expect(response.status).toBe(500);
    });
  });

  // Tests generales del sistema
  describe('Pruebas generales del sistema', () => {
    test('endpoints inexistentes devuelven 404', async () => {
      const res = await request(app).get('/unknown');
      expect(res.statusCode).toBe(404);
    });

    test('CORS está habilitado correctamente', async () => {
      const response = await request(app).get('/get/boxes');
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    test('Content-Type es application/json', async () => {
      mockGetMusicBoxes.mockResolvedValue({ docs: [] });
      const response = await request(app).get('/get/boxes');
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('loggeo incluye información relevante', async () => {
      const mockBoxes = {
        docs: [
          { id: 'log1', data: () => ({ name: 'Logged Box' }) }
        ]
      };
      
      mockGetMusicBoxes.mockResolvedValue(mockBoxes);
      
      await request(app).get('/get/boxes');
      
      expect(console.log).toHaveBeenCalledWith(
        'Sending Music Boxes: ',
        [{ id: 'log1', name: 'Logged Box' }]
      );
    });

    test('errores se loggean correctamente', async () => {
      const testError = new Error('Test error');
      
      mockGetSongs.mockRejectedValue(testError);
      
      await request(app).get('/get/songs');
      
      expect(console.log).toHaveBeenCalledWith(
        'Error while getting and filtering songs: ',
        testError
      );
    });
  });
});