import { Media } from "../models/media.model.js";

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

export const getAllMedia = async (req, res) => {
  try {
    const mediaList = await Media.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

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
