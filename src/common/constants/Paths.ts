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
    GetAll: '/',
    GetByID: '/:idOeuvre',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
