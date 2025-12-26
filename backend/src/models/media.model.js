import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    /* ================================
       1️⃣ BASIC REQUIRED FIELDS
    ================================= */

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
      required: true,
      enum: ["towatch", "watching", "watched"],
      default: "towatch",
    },

    /* ================================
       2️⃣ OPTIONAL BUT STRUCTURED
    ================================= */

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

    /* ================================
       3️⃣ TV-SPECIFIC (CONDITIONAL)
    ================================= */

    totalSeasons: {
      type: Number,
      min: 1,
      validate: {
        validator: function (value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined;
        },
        message: "totalSeasons allowed only for TV shows",
      },
    },

    totalEpisodes: {
      type: Number,
      min: 1,
      validate: {
        validator: function (value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined;
        },
        message: "totalEpisodes allowed only for TV shows",
      },
    },

    currentSeason: {
      type: Number,
      min: 1,
      validate: {
        validator: function (value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined;
        },
        message: "currentSeason allowed only for TV shows",
      },
    },

    currentEpisode: {
      type: Number,
      min: 1,
      validate: {
        validator: function (value) {
          if (this.format === "tv") return value >= 1;
          return value === undefined;
        },
        message: "currentEpisode allowed only for TV shows",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Media = mongoose.model("Media", mediaSchema);
