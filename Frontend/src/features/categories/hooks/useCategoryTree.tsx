import { JSX } from "react";
import Link from "next/link";
import { Category } from "@/features/categories/types/category";
import ArrowIcon from "@/assets/icons/arrowIcon";

export function buildCategoryTree(
  categories: Category[],
  handleClick: (
    name: string,
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => void,
  styles: Record<string, string>
) {
  const build = (parentId: string | null): JSX.Element[] =>
    categories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => {
        const hasChildren = categories.some(
          (child) => child.parentId === cat.id
        );

        return (
          <div
            key={cat.id}
            className={styles.category_item}
            onClick={(e) => handleClick(cat.name, cat.id, e)}
          >
            <li className={styles.category_item_list}>
              <Link
                href={"/"}
                className={styles.category_title}
                onClick={(e) => handleClick(cat.name, cat.id, e)}
              >
                {cat.name}
              </Link>

              {hasChildren && (
                <>
                  <ArrowIcon />
                  <ul className={styles.category_sub_menu}>{build(cat.id)}</ul>
                </>
              )}
            </li>
          </div>
        );
      });

  return build;
}
