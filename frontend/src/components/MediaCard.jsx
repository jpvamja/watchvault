import API from "../api/axios";

const statusColors = {
  towatch: "#999",
  watching: "#3498db",
  watched: "#2ecc71",
};

const tagStyle = {
  display: "inline-block",
  background: "#f1f1f1",
  padding: "2px 8px",
  borderRadius: "12px",
  fontSize: "0.75rem",
  marginRight: "6px",
};

const MediaCard = ({ media, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this media?")) return;

    try {
      await API.delete(`/media/${media._id}`);
      onDelete(media._id);
    } catch {
      alert("Failed to delete media");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "14px",
        background: "#fff",
      }}
    >
      {/* Title */}
      <h3>
        {media.title}{" "}
        <span style={{ fontSize: "0.8rem", color: "#666" }}>
          ({media.format})
        </span>
      </h3>

      {/* Status */}
      <span
        style={{
          background: statusColors[media.status],
          color: "#fff",
          padding: "4px 10px",
          borderRadius: "14px",
          fontSize: "0.75rem",
        }}
      >
        {media.status}
      </span>

      <p><strong>Platform:</strong> {media.platform || "—"}</p>

      {/* Rating */}
      <p>
        <strong>Rating:</strong>{" "}
        {media.myRating ? "⭐".repeat(media.myRating) : "Not rated"}
      </p>

      {/* TV-only fields */}
      {media.format === "tv" && (
        <p>
          <strong>Progress:</strong>{" "}
          S{media.currentSeason}E{media.currentEpisode} / S
          {media.totalSeasons}E{media.totalEpisodes}
        </p>
      )}

      {/* Tags */}
      {media.tags?.length > 0 && (
        <div>
          <strong>Tags:</strong>{" "}
          {media.tags.map((tag, idx) => (
            <span key={idx} style={tagStyle}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Notes */}
      {media.notes && (
        <div style={{ marginTop: "8px" }}>
          <strong>Notes:</strong>
          <div
            style={{
              background: "#f9f9f9",
              padding: "8px",
              borderRadius: "6px",
              marginTop: "4px",
              whiteSpace: "pre-wrap",
              fontSize: "0.85rem",
            }}
          >
            {media.notes}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: "12px" }}>
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
