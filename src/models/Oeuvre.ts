import mongoose, { Schema, model } from 'mongoose';

// Interface secondaire
export interface IArtiste {
  nom: string;
  prenom: string;
  surnom?: string;
}

// Interface principale
export interface IOeuvre {
  titre: string;
  artiste: IArtiste;
  prix: number;
  dateCreation: Date;
  tags?: string[];
  enVedette: boolean;
  imageUrl: string;
}

// Schemas
const ArtisteSchema = new Schema<IArtiste>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom de l\'artiste est obligatoire'],
      trim: true,
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom de l\'artiste est obligatoire'],
      trim: true,
    },
    surnom: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const OeuvreSchema = new Schema<IOeuvre>(
  {
    titre: {
      type: String,
      required: [true, 'Le titre de l\'oeuvre est obligatoire'],
      trim: true,
      minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
    },

    artiste: {
      type: ArtisteSchema,
      required: [true, 'Les informations de l\'artiste sont obligatoires'],
    },

    prix: {
      type: Number,
      required: [true, 'Le prix est obligatoire'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },

    dateCreation: {
      type: Date,
      required: [true, 'La date de création est obligatoire'],
      validate: {
        validator: function (v: Date) {
          return v <= new Date();
        },
        message: 'La date de création ne peut pas être dans le futur',
      },
    },

    imageUrl: {
      type: String,
      required: [true, 'L\'image est obligatoire'],
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    enVedette: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

mongoose.pluralize(null);

export const Oeuvre = model<IOeuvre>('oeuvres', OeuvreSchema);
