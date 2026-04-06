import React, { useEffect, useState, useCallback } from "react";
import { addRating, getRatings } from "../api/ratingApi";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const RatingSystem = ({ mentorId, studentId, projectId }) => {
  const [hasRated, setHasRated] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkExistingRating = useCallback(async () => {
    if (!mentorId || !studentId || !projectId) return;

    try {
      setLoading(true);
      const res = await getRatings(mentorId);
      
      // LOG THE DATA: Open your browser console (F12) to see exactly what 'r' looks like
      console.log("Ratings received from DB:", res.data);

      /**
       * THE "DEEP SCAN" FIX:
       * We check multiple possible field names (r.studentId OR r.student.id)
       * to ensure the match is found regardless of DTO structure.
       */
      const existing = res.data.find((r) => {
        const r_studentId = r.studentId || (r.student && r.student.id);
        const r_projectId = r.projectId || (r.project && r.project.id);
        const r_mentorId = r.mentorId || (r.mentor && r.mentor.id);
        
        return (
          Number(r_studentId) === Number(studentId) &&
          Number(r_projectId) === Number(projectId) &&
          Number(r_mentorId) === Number(mentorId)
        );
      });

      if (existing) {
        setHasRated(true);
        setUserRating(existing.rating);
        setComment(existing.comment || "");
      } else {
        setHasRated(false);
      }
    } catch (err) {
      console.error("Error verifying rating:", err);
    } finally {
      setLoading(false);
    }
  }, [mentorId, studentId, projectId]);

  useEffect(() => {
    checkExistingRating();
  }, [checkExistingRating]);

  const handleSubmit = async () => {
    if (userRating === 0) {
      toast.error("Please select stars");
      return;
    }

    try {
      await addRating({
        studentId: Number(studentId),
        mentorId: Number(mentorId),
        projectId: Number(projectId),
        rating: userRating,
        comment: comment,
      });

      toast.success("Rating Submitted ⭐");
      setHasRated(true);
      checkExistingRating(); // Re-sync
    } catch (err) {
      // If we hit this block, the Frontend failed to detect the rating but the DB did not.
      if (err.response?.status === 400 || err.response?.status === 500) {
        toast.info("Database confirms: You already rated this.");
        setHasRated(true);
        checkExistingRating(); 
      } else {
        toast.error("Error submitting rating");
      }
    }
  };

  if (loading) return <p className="text-xs text-gray-400 italic py-2">Syncing...</p>;

  if (hasRated) {
    return (
      <div className="bg-blue-50 p-3 rounded border border-blue-200 text-center animate-in fade-in duration-500">
        <p className="text-sm font-bold text-blue-800">✅ Rating Submitted</p>
        <div className="flex justify-center gap-1 my-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar key={s} color={s <= userRating ? "#ffc107" : "#e4e5e9"} size={14} />
          ))}
        </div>
        {comment && <p className="text-xs text-gray-500 italic mt-1">"{comment}"</p>}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-3 rounded border border-gray-200 shadow-inner space-y-2">
      <p className="text-xs font-bold text-gray-600 uppercase tracking-tight">Rate Mentor</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={22}
            className="cursor-pointer transition hover:scale-110"
            color={(hover || userRating) >= star ? "#ffc107" : "#e4e5e9"}
            onClick={() => setUserRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </div>
      <textarea
        placeholder="Feedback (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded text-sm outline-none focus:ring-1 focus:ring-blue-400 h-16"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full text-sm font-bold transition shadow-sm"
      >
        Submit
      </button>
    </div>
  );
};

export default RatingSystem;