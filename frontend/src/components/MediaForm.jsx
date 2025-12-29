import { useEffect, useState } from "react";
import API from "../api/axios";

const MediaForm = ({ onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    format: "movie",
    status: "towatch",
    platform: "",
    myRating: "",
    tags: "",
    notes: "",
    totalSeasons: "",
    totalEpisodes: "",
    currentSeason: "",
    currentEpisode: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
    };

    if (initialData) {
      await API.patch(`/media/${initialData._id}`, payload);
    } else {
      await API.post("/media", payload);
    }

    onSave();
    onClose();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, marginBottom: 16 }}>
      <h3>{initialData ? "Edit Media" : "Add Media"}</h3>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <select name="format" value={form.format} onChange={handleChange}>
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="towatch">To Watch</option>
          <option value="watching">Watching</option>
          <option value="watched">Watched</option>
        </select>

        <input name="platform" placeholder="Platform" value={form.platform} onChange={handleChange} />
        <input name="myRating" type="number" min="1" max="5" placeholder="Rating" value={form.myRating} onChange={handleChange} />
        <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

        {form.format === "tv" && (
          <>
            <input name="totalSeasons" placeholder="Total Seasons" value={form.totalSeasons} onChange={handleChange} />
            <input name="totalEpisodes" placeholder="Total Episodes" value={form.totalEpisodes} onChange={handleChange} />
            <input name="currentSeason" placeholder="Current Season" value={form.currentSeason} onChange={handleChange} />
            <input name="currentEpisode" placeholder="Current Episode" value={form.currentEpisode} onChange={handleChange} />
          </>
        )}

        <button type="submit">Save</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MediaForm;
