import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import authValidations from '../../middlewares/authValidations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findMatchesByProgress(req, res));
router.patch(
  '/:id/finish',
  (req: Request, res: Response, next) => authValidations.validateToken(req, res, next),
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  (req: Request, res: Response, next) => authValidations.validateToken(req, res, next),
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.post(
  '/',
  (req: Request, res: Response, next) => authValidations.validateToken(req, res, next),
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
