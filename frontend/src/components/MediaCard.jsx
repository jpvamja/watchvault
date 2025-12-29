import API from "../api/axios";

const statusColors = {
  towatch: "#999",
  watching: "#3498db",
  watched: "#2ecc71",
};

const MediaCard = ({ media, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this media?")) return;

    try {
      await API.delete(`/media/${media._id}`);
      onDelete(media._id);
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "12px",
      }}
    >
      <h3>
        {media.title}{" "}
        <span style={{ fontSize: "0.8rem", color: "#666" }}>
          ({media.format})
        </span>
      </h3>

      <span
        style={{
          background: statusColors[media.status],
          color: "#fff",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "0.75rem",
        }}
      >
        {media.status}
      </span>

      <p>Platform: {media.platform || "—"}</p>

      <p>
        Rating:{" "}
        {media.myRating ? "⭐".repeat(media.myRating) : "Not rated"}
      </p>

      {media.format === "tv" && (
        <p>
          Progress: S{media.currentSeason}E{media.currentEpisode} / S
          {media.totalSeasons}E{media.totalEpisodes}
        </p>
      )}

      <div style={{ marginTop: "10px" }}>
        <button>Edit</button>
        <button
          onClick={handleDelete}
          style={{ marginLeft: "8px", color: "red" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
