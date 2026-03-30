import type { Category } from "../types";
import { categories } from "../data/mockData";

interface SidebarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Categories</h2>
      <ul className="sidebar__list">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`sidebar__item ${activeCategory === cat ? "sidebar__item--active" : ""}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
