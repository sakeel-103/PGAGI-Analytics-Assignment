import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <Link href="/">PGAGI Analytics</Link>
        </div>
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/weather">Weather</Link>
          <Link href="/news">News</Link>
          <Link href="/finance">Finance</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Dashboard Header */}
        <h1 className="dashboard-header">
          Welcome to the PGAGI Analytics Dashboard
        </h1>

        {/* Dashboard Sections */}
        <div className="dashboard-grid">
          {/* Weather Section */}
          <div className="dashboard-section">
            <h2 className="section-title">Weather</h2>
            <p className="section-description">
              View real-time weather data for your location, including temperature, humidity, and forecasts.
            </p>
            <Link href="/weather" className="section-button weather-button">
            Weather
            </Link>
          </div>

          {/* News Section */}
          <div className="dashboard-section">
            <h2 className="section-title">News</h2>
            <p className="section-description">
              Stay updated with the latest news headlines across various categories like technology, sports, and business.
            </p>
            <Link href="/news" className="section-button weather-button">
              NewsFeed
            </Link>
          </div>

          {/* Finance Section */}
          <div className="dashboard-section">
            <h2 className="section-title">Finance</h2>
            <p className="section-description">
              Track real-time stock market data, including stock prices, trends, and historical data.
            </p>
            <Link href="/finance" className="section-button weather-button">
              Finance
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            className="icon"
          />
          Documentation
        </a>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
            className="icon"
          />
          GitHub
        </a>
        <a
          href="../../public/vercel.svg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/vercel.svg"
            alt="Vercel icon"
            width={16}
            height={16}
            className="icon"
          />
          Deployed on Vercel
        </a>
      </footer>
    </div>
  );
}