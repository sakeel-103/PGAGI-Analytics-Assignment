import React from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsFeedProps {
  data: Article[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ data }) => {
  if (!data || !data.length) {
    return (
      <div style={styles.emptyMessage}>
        <p>No news articles available at the moment.</p>
      </div>
    );
  }

  return (
    <div style={styles.newsFeedContainer}>
      {data.map((article, index) => (
        <div key={index} style={styles.articleCard}>
          {article.urlToImage && (
            <div style={styles.articleImageContainer}>
              <img
                src={article.urlToImage}
                alt={article.title}
                style={styles.articleImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div style={styles.articleContent}>
            <div style={styles.articleMeta}>
              <span style={styles.articleSource}>{article.source?.name}</span>
              <span style={styles.articleDate}>
                {new Date(article.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h2 style={styles.articleTitle}>{article.title}</h2>
            <p style={styles.articleDescription}>{article.description}</p>
            
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.readMoreButton}
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;

// CSS Styles
const styles = {
  newsFeedContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    width: "100%",
    maxWidth: "1200px",
  },
  articleCard: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  articleImageContainer: {
    height: "200px",
    overflow: "hidden",
  },
  articleImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  articleContent: {
    padding: "1.5rem",
    flex: "1",
    display: "flex",
    flexDirection: "column" as const,
  },
  articleMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
  },
  articleSource: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  articleDate: {
    color: "#666",
    fontSize: "0.9rem",
  },
  articleTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "0.75rem",
    lineHeight: "1.4",
    color: "#333",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },
  articleDescription: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
    lineHeight: "1.5",
    flex: "1",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },
  readMoreButton: {
    display: "inline-block",
    padding: "0.75rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    textAlign: "center" as const,
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#0069d9",
    },
  },
  emptyMessage: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    textAlign: "center" as const,
    width: "100%",
    maxWidth: "600px",
    color: "#666",
    fontSize: "1.1rem",
  },
};