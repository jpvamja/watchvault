import API from "../api/axios";

const MediaCard = ({ media, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this item?")) return;
    await API.delete(`/media/${media._id}`);
    onDelete(media._id);
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>{media.title} ({media.format})</h3>
      <p>Status: {media.status}</p>
      <p>Platform: {media.platform || "-"}</p>
      <p>Rating: {media.myRating ? "⭐".repeat(media.myRating) : "N/A"}</p>

      {media.format === "tv" && (
        <p>
          Progress: S{media.currentSeason}E{media.currentEpisode} / S
          {media.totalSeasons}E{media.totalEpisodes}
        </p>
      )}

      {media.tags?.length > 0 && <p>Tags: {media.tags.join(", ")}</p>}
      {media.notes && <p>Notes: {media.notes}</p>}

      <button onClick={() => onEdit(media)}>Edit</button>
      <button onClick={handleDelete} style={{ marginLeft: 8, color: "red" }}>
        Delete
      </button>
    </div>
  );
};

export default MediaCard;
