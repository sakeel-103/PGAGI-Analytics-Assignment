"use client";

import React from "react";
import useNewsData from "../../hooks/useNewsData";
import NewsFeed from "../../components/NewsFeed";
import Link from "next/link";

const NewsPage = () => {
  const { data, loading, error } = useNewsData();

  if (loading) return <div style={styles.loading}>Loading news articles...</div>;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarLogo}>
          <Link href="/" style={styles.navbarLink}>
            PGAGI Analytics
          </Link>
        </div>
        <div style={styles.navbarLinks}>
          <Link href="/" style={styles.navbarLink}>
            Home
          </Link>
          <Link href="/weather" style={styles.navbarLink}>
            Weather
          </Link>
          <Link href="/news" style={styles.navbarLink}>
            News
          </Link>
          <Link href="/finance" style={styles.navbarLink}>
            Finance
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h1 style={styles.header}>Latest News</h1>

        {/* Error Message */}
        {error && <div style={styles.errorMessage}>{error}</div>}

        {/* News Feed */}
        {!loading && !error && <NewsFeed data={data} />}
      </main>
    </div>
  );
};

export default NewsPage;

// CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
  },
  navbarLogo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navbarLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  navbarLink: {
    color: "#fff",
    textDecoration: "none",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "2rem",
  },
  header: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "2rem",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    color: "#007bff",
  },
  errorMessage: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  }
};