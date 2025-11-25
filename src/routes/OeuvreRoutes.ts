import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import OeuvreService from '@src/services/OeuvreService';
import { IOeuvre } from '@src/models/Oeuvre';

/**
 * Extraire toutes les oeuvres
 */
async function getAll(req: IReq, res: IRes) {
  const tagsParam = req.query.tags as string | undefined;

  let tags: string[] | undefined;

  if (tagsParam) {
    tags = tagsParam.split(',').map((tag) => tag.trim());
  }

  const oeuvres = await OeuvreService.getAll();
  return res.status(HttpStatusCodes.OK).json({ oeuvres });
}

/**
 * Extraire une oeuvre par son ID
 */
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params as { id: string };

  const oeuvre = await OeuvreService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ oeuvre });
}

/**
 * Ajouter une oeuvre
 */
async function add(req: IReq, res: IRes) {
  const { oeuvre } = req.body;
  await OeuvreService.addOne(oeuvre as IOeuvre);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Mettre à jour une oeuvre
 */
async function update(req: IReq, res: IRes) {
  const { id } = req.params as { id: string };
  const { oeuvre } = req.body;

  await OeuvreService.updateOne(id, oeuvre as IOeuvre);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Supprimer une oeuvre
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = req.params as { id: string };

  await OeuvreService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //
export default {
  getAll,
  getOne,
  add,
  update,
  delete: delete_,
} as const;
