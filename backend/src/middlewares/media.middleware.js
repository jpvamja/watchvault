export const validateAddMedia = (req, res, next) => {
  const { title, format, status, totalSeasons, totalEpisodes } = req.body;

  if (
    !title ||
    !format ||
    !status ||
    typeof title !== "string" ||
    typeof format !== "string" ||
    typeof status !== "string" ||
    title.trim() === "" ||
    format.trim() === "" ||
    status.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  if (!["movie", "tv"].includes(format)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  if (!["towatch", "watching", "watched"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  // 🔴 TV-specific required fields
  if (format === "tv") {
    if (
      typeof totalSeasons !== "number" ||
      typeof totalEpisodes !== "number" ||
      totalSeasons < 1 ||
      totalEpisodes < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "TV shows require totalSeasons and totalEpisodes",
      });
    }
  }

  next();
};

export const validateUpdateMedia = (req, res, next) => {
  const allowedFields = [
    "status",
    "myRating",
    "notes",
    "tags",
    "genres",
    "platform",
    "currentSeason",
    "currentEpisode",
    "totalSeasons",
    "totalEpisodes",
  ];

  const updates = Object.keys(req.body);

  if (updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  if (!updates.every((field) => allowedFields.includes(field))) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  if (
    req.body.status &&
    !["towatch", "watching", "watched"].includes(req.body.status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  if (
    req.body.myRating !== undefined &&
    (req.body.myRating < 1 || req.body.myRating > 5)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  if (
    req.body.platform &&
    !["netflix", "prime", "hotstar", "other"].includes(req.body.platform)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }

  const numberFields = [
    "currentSeason",
    "currentEpisode",
    "totalSeasons",
    "totalEpisodes",
  ];

  for (const field of numberFields) {
    if (
      req.body[field] !== undefined &&
      (typeof req.body[field] !== "number" || req.body[field] < 1)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
  }

  next();
};
