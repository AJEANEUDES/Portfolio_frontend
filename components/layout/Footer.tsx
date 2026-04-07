export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-200 dark:border-dark-border">
      <div className="section-container text-center text-sm text-gray-500 dark:text-gray-400">
        <p><b>  Yao Jean-Eudes Adjanohoun </b> &copy; {year}</p>
      </div>
    </footer>
  );
}