import Link from 'next/link';
import styles from './styles.module.css'

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    genreId?: number;
    searchName?: string;
};

const Pagination = ({ currentPage, totalPages, genreId, searchName}: PaginationProps) => {
    const visiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const getHref = (page: number) => {
        if (searchName) {
            return `/admin/${searchName}/${page}`;
        }
        return genreId
            ? `/booklist/${page}/${genreId}`
            : `/booklist/${page}`;
    };

    return (
        <div className={styles.pagination_container}>

            <Link
                href={getHref(currentPage - 1)}
                style={{
                    pointerEvents: currentPage === 1 ? 'none' : 'auto',
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <button className={styles.filter} disabled={currentPage === 1}>
                    &laquo; Попередня сторінка
                </button>
            </Link>

            {pages.map((page) => (
                <Link
                    key={page}
                    href={getHref(page)}
                    style={{
                        margin: '0 5px',
                        fontWeight: currentPage === page ? 'bold' : 'normal',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <button className={styles.filter} key={page}>

                        {page}
                    </button>
                </Link>
            ))}

            <Link
                href={getHref(currentPage + 1)}
                style={{
                    pointerEvents: currentPage === totalPages ? 'none' : 'auto',
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <button className={styles.filter} disabled={currentPage === totalPages}>

                    Наступна сторінка &raquo;
                </button>
            </Link>
        </div>
    );
};

export default Pagination;