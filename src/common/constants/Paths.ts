export default {
  Base: '/api',
  Oeuvres: {
    Base: '/oeuvres',
    Get: '/',
    GetById: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
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
} as const;
