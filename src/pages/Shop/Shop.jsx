import styles from "./Shop.module.css";

export default function Shop() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main className={styles.shop}>
      <header className={styles.shopHeader}>
        <div className={styles.headerleft}>
          <h1>Produce</h1>
          <p>
            Fresh — <span>{formattedDate}</span>
          </p>
        </div>
        <div className={styles.headerright}>
          <button className={styles.filterDropdown}>
            Filter & Sort{" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 89 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4321 26.0627H27.8482"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M48.2085 26.0627H72.5678"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M38.0068 32.3337C41.4701 32.3337 44.2777 29.5262 44.2777 26.0628C44.2777 22.5995 41.4701 19.7919 38.0068 19.7919C34.5434 19.7919 31.7358 22.5995 31.7358 26.0628C31.7358 29.5262 34.5434 32.3337 38.0068 32.3337Z"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M72.5679 44.4164H61.1519"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M40.7914 44.4164H16.4321"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M50.9936 50.6873C54.4569 50.6873 57.2645 47.8797 57.2645 44.4163C57.2645 40.953 54.4569 38.1454 50.9936 38.1454C47.5303 38.1454 44.7227 40.953 44.7227 44.4163C44.7227 47.8797 47.5303 50.6873 50.9936 50.6873Z"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M72.568 62.9373H53.1357"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M32.7752 62.9373H16.4321"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M42.977 69.2081C46.4403 69.2081 49.2479 66.4005 49.2479 62.9372C49.2479 59.4739 46.4403 56.6663 42.977 56.6663C39.5137 56.6663 36.7061 59.4739 36.7061 62.9372C36.7061 66.4005 39.5137 69.2081 42.977 69.2081Z"
                stroke="currentcolor"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
    </main>
  );
}
