export default {
  Base: '/api',
  Oeuvres: {
    Base: '/oeuvres',
    Get: '/', // GET /api/oeuvres
    GetById: '/:id', // GET /api/oeuvres/:id
    Add: '/', // POST /api/oeuvres
    Update: '/:id', // PUT /api/oeuvres/:id
    Delete: '/:id', // DELETE /api/oeuvres/:id
  },
} as const;
