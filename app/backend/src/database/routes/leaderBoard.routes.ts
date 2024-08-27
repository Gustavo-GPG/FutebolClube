import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getOverallLeaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getLeaderboardHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getLeaderboardAway(req, res),
);

export default router;
