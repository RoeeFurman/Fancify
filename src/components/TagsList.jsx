import { Link } from "react-router-dom";

export const TagsList = ({ tags }) => {
  return (
    <section>
      {tags && (
        <div className="tags-list">
          {tags.map((tag) => {
            return (
              <Link to={`/screen/genre/${tag.title}`} key={tag.title}>
                <div
                  key={tag.title}
                  style={{ backgroundColor: tag.color }}
                  className="tag-preview"
                >
                  {tag && (
                    <div>
                      <h2>{tag?.title}</h2>
                      <img className="tag-img" src={tag.imgUrl} />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
