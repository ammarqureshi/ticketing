import express from 'express';
import jwt from 'jsonwebtoken';
import {currentUser} from '../middlerwares/current-user';
import {requireAuth} from '../middlerwares/require-auth';

const router = express.Router();

//add in currentUser middleware
router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
