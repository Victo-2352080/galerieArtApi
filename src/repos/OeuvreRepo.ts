import { IOeuvre, Oeuvre } from '@src/models/Oeuvre';

/******************************************************************************
                        Functions
******************************************************************************/

/**
 * Get one oeuvre by ID.
 */
async function getOne(id: string): Promise<IOeuvre | null> {
  return await Oeuvre.findById(id);
}

/**
 * See if an oeuvre with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const oeuvre = await Oeuvre.exists({ _id: id });
  return oeuvre !== null;
}

/**
 * Get all oeuvres (optionally filtered by tags).
 */
// Fix in OeuvreRepo.ts
async function getAll(): Promise<IOeuvre[]> {
  return await Oeuvre.find();
}

/**
 * Get oeuvres by tag
 */
async function getByTag(tag: string): Promise<IOeuvre[]> {
  // Recherche exacte dans le tableau tags
  return await Oeuvre.find({ tags: tag }).exec();
}

/**
 * Add one oeuvre.
 */
async function add(oeuvre: IOeuvre): Promise<void> {
  const nouvelleOeuvre = new Oeuvre(oeuvre);
  await nouvelleOeuvre.save();
}

async function update(id: string, oeuvre: IOeuvre): Promise<void> {
  const oeuvreAModifier = await Oeuvre.findById(id);

  if (!oeuvreAModifier) {
    throw new Error('Oeuvre non trouvée');
  }

  oeuvreAModifier.titre = oeuvre.titre;
  oeuvreAModifier.artiste = oeuvre.artiste;
  oeuvreAModifier.prix = oeuvre.prix;
  oeuvreAModifier.dateCreation = oeuvre.dateCreation;
  oeuvreAModifier.enVedette = oeuvre.enVedette;
  oeuvreAModifier.imageUrl = oeuvre.imageUrl;
  if (oeuvre.tags !== undefined) {
    oeuvreAModifier.tags = oeuvre.tags;
  }

  await oeuvreAModifier.save();
}

/**
 * Delete one oeuvre.
 */
async function delete_(id: string): Promise<void> {
  await Oeuvre.findByIdAndDelete(id);
}

/******************************************************************************
                        Export default
******************************************************************************/

export default {
  getOne,
  persists,
  getAll,
  getByTag,
  add,
  update,
  delete: delete_,
} as const;
