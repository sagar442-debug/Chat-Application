import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  acceptFriendRequestById,
  addFriendById,
  getUsersByName,
  getUsersForSidebar,
  getPendingRequests,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/find-friend/:name?", protectRoute, getUsersByName);
router.post("/add-friend", protectRoute, addFriendById);
router.post("/accept-friend", protectRoute, acceptFriendRequestById);
router.get("/pending-requests", protectRoute, getPendingRequests);

export default router;
