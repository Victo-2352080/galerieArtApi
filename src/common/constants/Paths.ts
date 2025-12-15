export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Post: '/',
  },
  Utilisateurs: {
    Base: '/utilisateurs',
    GetAll: '/',
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
