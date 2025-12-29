import { useEffect, useState } from "react";
import API from "../api/axios";
import MediaCard from "../components/MediaCard";
import MediaForm from "../components/MediaForm";

const MediaList = () => {
  const [media, setMedia] = useState([]);      // ALWAYS array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  /* ======================
     NORMALIZE RESPONSE
  ====================== */
  const normalizeMedia = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.media)) return response.media;
    if (Array.isArray(response?.data?.media)) return response.data.media;
    return [];
  };

  /* ======================
     FETCH MEDIA
  ====================== */
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await API.get("/media");
      const mediaArray = normalizeMedia(res.data);
      setMedia(mediaArray);
    } catch (err) {
      console.error(err);
      setError("Failed to load media");
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  /* ======================
     DELETE HANDLER
  ====================== */
  const handleDelete = (id) => {
    setMedia((prev) => prev.filter((m) => m._id !== id));
  };

  if (loading) return <p>⏳ Loading your media...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <button onClick={() => setShowForm(true)}>➕ Add Media</button>

      {showForm && (
        <MediaForm
          initialData={editing}
          onSave={fetchMedia}
          onClose={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}

      {media.length === 0 ? (
        <p>No media found.</p>
      ) : (
        media.map((item) => (
          <MediaCard
            key={item._id}
            media={item}
            onDelete={handleDelete}
            onEdit={(m) => {
              setEditing(m);
              setShowForm(true);
            }}
          />
        ))
      )}
    </div>
  );
};

export default MediaList;
