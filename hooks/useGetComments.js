import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useGetComments = (id) => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, `posts/${id}/comments`), (doc) => {
        const comments = doc.docs
          .map((comment) => ({
            ...comment.data(),
            id: comment.id,
          }))
          .sort((a, b) => a.date - b.date);

        setAllComments(comments);
      });
    })();
  }, [id]);

  return [allComments, setAllComments];
};
