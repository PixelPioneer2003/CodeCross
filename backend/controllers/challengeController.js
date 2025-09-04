// controllers/challengeController.js
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
import { getIO } from "../socket.js";
import { getRandomProblem } from "../utils/getRandomProblem.js";

// ✅ Send challenge
export const sendChallenge = async (req, res) => {
  const { receiverUsername, rating, tag, timeLimit } = req.body;
  try {
    const receiver = await User.findOne({ username: receiverUsername });
    if (!receiver) return res.status(404).json({ error: "Receiver not found" });

    const sender = await User.findById(req.user._id);
    const newChallenge = new Challenge({
      sender: req.user._id,
      receiver: receiver._id,
      rating,
      tag,
      timeLimit,
      status: "pending",
    });

    const savedChallenge = await newChallenge.save();

    const io = getIO();
    io.to(receiver._id.toString()).emit("newChallenge", {
      _id: savedChallenge._id,
      sender: { username: sender.username, profilePic: sender.profilePic },
      rating,
      timeLimit,
      tag,
      status: "pending",
      createdAt: savedChallenge.createdAt,
    });

    res
      .status(201)
      .json({ message: "Challenge sent", challenge: savedChallenge });
  } catch (err) {
    console.error("❌ Send challenge error:", err);
    res.status(500).json({ error: "Failed to send challenge" });
  }
};

// ✅ Accept challenge
export const acceptChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate("sender", "username profilePic")
      .populate("receiver", "username profilePic");

    if (
      !challenge ||
      challenge.receiver._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized or challenge not found" });
    }

    challenge.status = "ongoing";
    challenge.startTime = new Date();
    challenge.problem = await getRandomProblem(challenge.rating, challenge.tag);

    await challenge.save();

    const io = getIO();
    io.to(challenge._id.toString()).emit("startContest", {
      challengeId: challenge._id.toString(),
      timestamp: Date.now(),
      timeLimit: challenge.timeLimit,
      sender: challenge.sender,
      receiver: challenge.receiver,
      problem: challenge.problem,
    });

    res.status(200).json({ message: "Challenge accepted", challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to accept challenge" });
  }
};

// ✅ Reject challenge
export const rejectChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (
      !challenge ||
      challenge.receiver.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized or challenge not found" });
    }

    challenge.status = "rejected";
    await challenge.save();

    res.status(200).json({ message: "Challenge rejected" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reject challenge" });
  }
};

// ✅ Withdraw challenge
export const withdrawChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge || challenge.sender.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized or challenge not found" });
    }
    if (challenge.status !== "pending") {
      return res.status(400).json({ error: "Challenge cannot be withdrawn" });
    }

    await challenge.deleteOne();
    res.status(200).json({ message: "Challenge withdrawn successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to withdraw challenge" });
  }
};

// ✅ Fetch received challenges
export const getReceivedChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "username profilePic");

    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch received challenges" });
  }
};

// ✅ Fetch ongoing challenges
export const getOngoingChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
      status: "ongoing",
    })
      .populate("sender", "username profilePic")
      .populate("receiver", "username profilePic");

    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ongoing challenges" });
  }
};

// ✅ Fetch challenges sent by me
export const getMyChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({
      sender: req.user._id,
      status: "pending",
    }).populate("receiver", "username profilePic");

    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch my challenges" });
  }
};

// ✅ Fetch challenge by ID
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate("sender", "username profilePic")
      .populate("receiver", "username profilePic");

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch challenge" });
  }
};

// ✅ Submit contest result
export const submitResult = async (req, res) => {
  const { challengeId, winnerId, isDraw } = req.body;
  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    challenge.status = "finished";
    challenge.winner = isDraw ? null : winnerId;
    challenge.isDraw = isDraw;

    await challenge.save();

    const io = getIO();
    io.to(challenge._id.toString()).emit("contestEnded", { winnerId, isDraw });

    res.status(200).json({ message: "Result submitted", challenge });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit result" });
  }
};
