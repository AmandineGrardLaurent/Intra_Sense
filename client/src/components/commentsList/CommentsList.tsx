import { useEffect, useState } from "react";
import style from "./commentsList.module.css";

export default function CommentsList({
  id,
  refresh,
}: {
  id: string;
  refresh: boolean;
}) {
  const [comments, setComments] = useState<CommentType[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decision/comment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [id, refresh]);

  return (
    comments.length > 0 && (
      <div>
        <section className={style.container}>
          <h2 className={style.titleH2}>Les commentaires</h2>
          {comments.map((comment) => (
            <article key={comment.content} className={style.comment}>
              <p className={style.name}>
                {comment.firstname.charAt(0).toUpperCase() +
                  comment.firstname.slice(1)}{" "}
                {comment.lastname.charAt(0).toUpperCase() +
                  comment.lastname.slice(1)}
              </p>
              <p className={style.paragraph}>{comment.content}</p>
            </article>
          ))}
        </section>
      </div>
    )
  );
}
