// Erreur de build fixé par Claude.AI - 2025-12-10
import mongoose, { Schema, model } from 'mongoose';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IUtilisateur {
  id: string;
  courriel: string;
  motDePasse: string;
}

// Schéma interne qui correspond à la structure dans MongoDB
interface IUtilisateurDocument {
  _id: mongoose.Types.ObjectId;
  utilisateurLogin: {
    courriel: string,
    motDePasse: string,
  };
}

const UtilisateurSchema = new Schema({
  utilisateurLogin: {
    courriel: { type: String, required: [true, 'Le courriel est requis'] },
    motDePasse: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
    },
  },
});

mongoose.pluralize(null);

export const Utilisateur = model<IUtilisateurDocument>(
  'utilisateurs',
  UtilisateurSchema,
);
