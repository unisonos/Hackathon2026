import { jest } from '@jest/globals';

// Mock de firebase/firestore
const mockCollection = jest.fn();
const mockGetDocs = jest.fn();
const mockQuery = jest.fn();
const mockOrderBy = jest.fn();
const mockStartAt = jest.fn();
const mockEndAt = jest.fn();
const mockDoc = jest.fn();
const mockGetDoc = jest.fn();
const mockAddDoc = jest.fn();

jest.unstable_mockModule('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({ fake: 'db' })),
  collection: mockCollection,
  getDocs: mockGetDocs,
  query: mockQuery,
  orderBy: mockOrderBy,
  startAt: mockStartAt,
  endAt: mockEndAt,
  doc: mockDoc,
  getDoc: mockGetDoc,
  addDoc: mockAddDoc,
}));

const {
  getSongs,
  getFilteredSongs,
  getMusicBoxes,
  getProduct,
  addPurchaseDetails,
} = await import('./firebase.js');

describe('Firebase funciones', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getSongs llama a getDocs con colección songs', async () => {
    await getSongs();
    expect(mockCollection).toHaveBeenCalledWith({ fake: 'db' }, 'songs');
    expect(mockGetDocs).toHaveBeenCalled();
  });

  test('getFilteredSongs llama correctamente a query', async () => {
    await getFilteredSongs('abc');
    expect(mockCollection).toHaveBeenCalledWith({ fake: 'db' }, 'songs');
    expect(mockOrderBy).toHaveBeenCalledWith('song_name_lower');
    expect(mockStartAt).toHaveBeenCalledWith('abc');
    expect(mockEndAt).toHaveBeenCalledWith('abc\uf8ff');
    expect(mockQuery).toHaveBeenCalled();
    expect(mockGetDocs).toHaveBeenCalled();
  });

  test('getMusicBoxes llama a getDocs con colección music_boxes', async () => {
    await getMusicBoxes();
    expect(mockCollection).toHaveBeenCalledWith({ fake: 'db' }, 'music_boxes');
    expect(mockGetDocs).toHaveBeenCalled();
  });

  test('getProduct llama a getDoc con el documento correcto', async () => {
    mockDoc.mockReturnValueOnce({ fake: 'doc' });
    await getProduct('456');
    expect(mockDoc).toHaveBeenCalledWith({ fake: 'db' }, 'music_boxes', '456');
    expect(mockGetDoc).toHaveBeenCalledWith({ fake: 'doc' });
  });

  test('getFilteredSongs llama endAt con sufijo correcto', async () => {
    await getFilteredSongs('mel');
    expect(mockEndAt).toHaveBeenCalledWith('mel\uf8ff');
  });

  test('funciones exportadas existen y son funciones', () => {
    expect(typeof getSongs).toBe('function');
    expect(typeof getFilteredSongs).toBe('function');
    expect(typeof getMusicBoxes).toBe('function');
    expect(typeof getProduct).toBe('function');
    expect(typeof addPurchaseDetails).toBe('function');
  });
});