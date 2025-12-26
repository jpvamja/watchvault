import { Media } from "../models/media.model.js";

/* ======================
   ADD MEDIA
====================== */
export const addMedia = async (req, res) => {
  try {
    const media = await Media.create({
      ...req.body,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Media added successfully",
      media,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================
   GET ALL MEDIA
   (FILTER + SORT)
====================== */
export const getAllMedia = async (req, res) => {
  try {
    // 🔒 ownership
    const query = { user: req.user.id };

    const { status, platform, format, rating, sort } = req.query;

    /* ---------- FILTERS (AND LOGIC) ---------- */

    if (status) {
      if (!["towatch", "watching", "watched"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status filter",
        });
      }
      query.status = status;
    }

    if (format) {
      if (!["movie", "tv"].includes(format)) {
        return res.status(400).json({
          success: false,
          message: "Invalid format filter",
        });
      }
      query.format = format;
    }

    if (platform) {
      query.platform = new RegExp(`^${platform}$`, "i");
    }

    if (rating) {
      if (rating.endsWith("+")) {
        const min = Number(rating.replace("+", ""));
        if (min < 1 || min > 5 || Number.isNaN(min)) {
          return res.status(400).json({
            success: false,
            message: "Invalid rating filter",
          });
        }
        query.myRating = { $gte: min };
      } else {
        const exact = Number(rating);
        if (exact < 1 || exact > 5 || Number.isNaN(exact)) {
          return res.status(400).json({
            success: false,
            message: "Invalid rating filter",
          });
        }
        query.myRating = exact;
      }
    }

    /* ---------- SORTING ---------- */
    let sortOption = { createdAt: -1 }; // default recent

    if (sort) {
      if (sort === "rating") {
        sortOption = { myRating: -1, createdAt: -1 };
      } else if (sort === "recent") {
        sortOption = { createdAt: -1 };
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid sort option",
        });
      }
    }

    const mediaList = await Media.find(query).sort(sortOption);

    return res.status(200).json({
      success: true,
      count: mediaList.length,
      media: mediaList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================
   UPDATE MEDIA
====================== */
export const updateMedia = async (req, res) => {
  try {
    const media = await Media.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    Object.assign(media, req.body);
    await media.save();

    return res.status(200).json({
      success: true,
      message: "Media updated successfully",
      media,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================
   DELETE MEDIA
====================== */
export const deleteMedia = async (req, res) => {
  try {
    const deleted = await Media.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
