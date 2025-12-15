export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Post: '/',
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
    GetByTag: '/tag/:tag',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
