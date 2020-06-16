import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getVoitures, getVoiture, addVoiture, updateVoiture, deleteVoiture } from './controler.ts';

const router = new Router();
router.get('/voitures', getVoitures)
      .get('/voitures/:id', getVoiture)
      .post('/voitures', addVoiture)
      .put('/voitures/:id', updateVoiture)
      .delete('/voitures/:id', deleteVoiture);

export default router;

