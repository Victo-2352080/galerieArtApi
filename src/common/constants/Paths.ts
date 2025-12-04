export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
  Oeuvres: {
    Base: '/oeuvres',
    Get: '/',
    GetById: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
