import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    format: {
      type: String,
      required: true,
      enum: ["movie", "tv"],
    },

    status: {
      type: String,
      enum: ["towatch", "watching", "watched"],
      default: "towatch",
    },

    genres: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      trim: true,
    },

    myRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    platform: {
      type: String,
      enum: ["netflix", "prime", "hotstar", "other"],
    },

    imdbId: {
      type: String,
      trim: true,
    },

    totalSeasons: {
      type: Number,
      min: 1,
      validate: {
        validator(value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined || value === null;
        },
        message: "totalSeasons allowed only for TV shows",
      },
    },

    totalEpisodes: {
      type: Number,
      min: 1,
      validate: {
        validator(value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined || value === null;
        },
        message: "totalEpisodes allowed only for TV shows",
      },
    },

    currentSeason: {
      type: Number,
      min: 1,
      validate: {
        validator(value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined || value === null;
        },
        message: "currentSeason allowed only for TV shows",
      },
    },

    currentEpisode: {
      type: Number,
      min: 1,
      validate: {
        validator(value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined || value === null;
        },
        message: "currentEpisode allowed only for TV shows",
      },
    },
  },
  { timestamps: true }
);

// 🔍 Performance index
mediaSchema.index({ user: 1, createdAt: -1 });

export const Media = mongoose.model("Media", mediaSchema);
