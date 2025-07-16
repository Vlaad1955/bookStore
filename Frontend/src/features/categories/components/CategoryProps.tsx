"use client";
import Link from "next/link";
import React from "react";

import { useBookStore } from "@/features/books/store/book";
import styles from "./styles.module.scss";

type CategoryLinkProps = {
  basePath?: string;
};

const CategoryProps = ({ basePath }: CategoryLinkProps) => {
  const selectedCategories = useBookStore((state) => state.selectedCategories);

  return (
    <div className={styles.category_props}>
      <Link href={"/"} className={styles.category_books}>
        Перелік книг
      </Link>

      <div className={styles.category_name}>
        Категорії:{" "}
        <Link href={`${basePath}?categories=${selectedCategories[1]}`}>
          {selectedCategories[0]}
        </Link>
      </div>
    </div>
  );
};

export default CategoryProps;

// "use client";
// import Link from "next/link";
// import React, { useEffect } from "react";

// import { useBookStore } from "@/features/books/store/book";
// import styles from "./styles.module.scss";
// import { useSearchParams } from "next/navigation";

// type CategoryLinkProps = {
//   basePath?: string;
// };

// const CategoryProps = ({ basePath }: CategoryLinkProps) => {
//   const selectedCategories = useBookStore((state) => state.selectedCategories);
//   const clearSelectedCategories = useBookStore(
//     (state) => state.clearSelectedCategories
//   );

//   const searchParams = useSearchParams();
//   const categoriesParam = searchParams.get("categories");

//   useEffect(() => {
//     if (!categoriesParam) {
//       clearSelectedCategories();
//     }
//   }, [categoriesParam, clearSelectedCategories]);

//   return (
//     <div className={styles.category_props}>
//       <Link href={"/"} className={styles.category_books}>
//         Перелік книг
//       </Link>

//       <div className={styles.category_name}>
//         {!categoriesParam ? (
//           <span>Всі книги</span>
//         ) : (
//           <>
//             Категорії:{" "}
//             <Link href={`${basePath}?categories=${selectedCategories[1]}`}>
//               {selectedCategories[0]}
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryProps;
