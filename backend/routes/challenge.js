import express from "express";
import {
  sendChallenge,
  acceptChallenge,
  rejectChallenge,
  withdrawChallenge,
  getReceivedChallenges,
  getOngoingChallenges,
  getMyChallenges,
  getChallengeById,
  submitResult,
} from "../controllers/challengeController.js";
import { verifyToken as protect } from "../middleware/userAuth.js";

const router = express.Router();

// 📌 Challenge actions
router.post("/send", protect, sendChallenge);
router.post("/:id/accept", protect, acceptChallenge);
router.post("/:id/reject", protect, rejectChallenge);
router.delete("/:id/withdraw", protect, withdrawChallenge);

// 📌 Fetch challenges
router.get("/received", protect, getReceivedChallenges);
router.get("/ongoing", protect, getOngoingChallenges);
router.get("/my", protect, getMyChallenges);
router.get("/:id", protect, getChallengeById);

// 📌 Submit result
router.post("/submit-result", protect, submitResult);

export default router;
