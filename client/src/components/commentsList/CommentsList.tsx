import { useEffect, useState } from "react";
import style from "./commentsList.module.css";

export default function CommentsList({ id }: { id: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decision/comment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [id]);

  return (
    comments.length > 0 && (
      <div>
        <section className={style.container}>
          <h2 className={style.titleH2}>Les commentaires</h2>
          {comments.map((comment) => (
            <article key={comment.content} className={style.comment}>
              <p className={style.name}>
                {comment.firstname} {comment.lastname}
              </p>
              <p className={style.paragraph}>{comment.content}</p>
            </article>
          ))}
        </section>
      </div>
    )
  );
}
