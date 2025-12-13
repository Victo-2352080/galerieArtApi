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
  Utilisateur: {
    Base: '/utilisateur',
    GetByEmail: '/connexion/:email',
  },
} as const;
