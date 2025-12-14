import OeuvreRepo from '@src/repos/OeuvreRepo';
import { IOeuvre } from '@src/models/Oeuvre';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';

// **** Functions **** //

/**
 * Extraire toutes les oeuvres (avec filtre optionnel)
 */
async function getAll() {
  const oeuvres = await OeuvreRepo.getAll();
  return oeuvres;
}

/**
 * Extraire une oeuvre par son ID
 */
async function getOne(id: string) {
  const oeuvre = await OeuvreRepo.getOne(id);
  if (!oeuvre) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Oeuvre non trouvée');
  }
  return oeuvre;
}

/**
 * Ajouter une oeuvre
 */
async function addOne(oeuvre: IOeuvre) {
  if (!oeuvre) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'Oeuvre data is required',
    );
  }
  return await OeuvreRepo.add(oeuvre);
}

/**
 * Mettre à jour une oeuvre
 */
async function updateOne(id: string, oeuvre: IOeuvre) {
  if (!id) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'ID requis');
  }
  return await OeuvreRepo.update(id, oeuvre);
}

/**
 * Supprimer une oeuvre
 */
async function delete_(id: string) {
  if (!id) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'ID requis');
  }
  return await OeuvreRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: delete_,
} as const;
