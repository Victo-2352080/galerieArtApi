export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
  Utilisateurs: {
    Base: '/utilisateurs',
    GetAll: '/',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
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
