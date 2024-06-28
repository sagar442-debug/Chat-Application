import mongoose from "mongoose";
import User from "../models/user.model.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch the logged-in user to get the friends list
    const loggedInUser = await User.findById(loggedInUserId).populate(
      "friends"
    );

    if (!loggedInUser) {
      return res.status(404).json({ error: "Logged-in user not found" });
    }

    // Extract friends IDs from the user's friends array
    const friendsIds = loggedInUser.friends.map((friend) => friend._id);

    // Fetch the friend details excluding passwords
    const friendsDetails = await User.find({ _id: { $in: friendsIds } }).select(
      "-password"
    );

    res.status(200).json(friendsDetails);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersByName = async (req, res) => {
  const { name = "" } = req.params; // Default to empty string if no name is provided
  const loggedInUserId = req.user._id;

  try {
    // Fetch the logged-in user to get their friends list
    const loggedInUser = await User.findById(loggedInUserId).select("friends");

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendsList = loggedInUser.friends;

    let filteredUsers;

    // Build the query object based on whether a name is provided
    const query = {
      _id: { $ne: loggedInUserId, $nin: friendsList }, // Exclude logged-in user and friends
    };

    if (name !== "") {
      query.fullName = { $regex: new RegExp(name, "i") }; // Case-insensitive search by name
    }

    // Fetch users matching the query, excluding the password field
    filteredUsers = await User.find(query).select("-password");

    // Send the filtered users as response
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersByName", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addFriendById = async (req, res) => {
  const { friendId } = req.body;
  const loggedInUserId = req.user._id;
  try {
    if (!mongoose.isValidObjectId(friendId)) {
      return res.status(400).json({ error: "Invalid requestId" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    if (friend.pendingRequests.includes(loggedInUserId)) {
      return res.status(400).json({ error: "Friend request already sent!" });
    }

    await User.findByIdAndUpdate(friendId, {
      $addToSet: { pendingRequests: loggedInUserId },
    });
    // await User.findByIdAndUpdate(loggedInUserId, {
    //   $addToSet: { pendingRequests: friendId },
    // });

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate("pendingRequests", "fullName profilePic") // Populate with user's name and profile picture
      .select("pendingRequests"); // Only select the pendingRequests field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.pendingRequests);
  } catch (error) {
    console.log("Error fetching pending requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const acceptFriendRequestById = async (req, res) => {
  const { requestId } = req.body;
  const loggedInUserId = req.user._id;
  try {
    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ error: "Invalid requests" });
    }
    const user = await User.findByIdAndUpdate(
      loggedInUserId,
      { $pull: { pendingRequests: requestId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the logged-in user to the recipient's friends list
    await User.findByIdAndUpdate(requestId, {
      $addToSet: { friends: loggedInUserId },
    });
    await User.findByIdAndUpdate(loggedInUserId, {
      $addToSet: { friends: requestId },
    });

    const friend = await User.findByIdAndUpdate(
      requestId,
      {
        $addToSet: { friends: loggedInUserId },
        $pull: { pendingRequests: loggedInUserId },
      }, // Remove pending request from friend
      { new: true }
    );

    const anotherFriend = await User.findByIdAndUpdate(
      loggedInUserId,
      {
        $addToSet: { friends: requestId },
        $pull: { pendingRequests: requestId },
      }, // Remove pending request from friend
      { new: true }
    );

    console.log(requestId);

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }
    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getUsersForSidebar,
  getUsersByName,
  addFriendById,
  acceptFriendRequestById,
  getPendingRequests,
};
