import Link from 'next/link';
import styles from './styles.module.scss'

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    searchName?: string;
    params?: URLSearchParams;
    userName?: string;
    likesPage?:string;
};

const Pagination = ({currentPage, totalPages, searchName, params, userName, likesPage}: PaginationProps) => {
    const visiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const pages = Array.from(
        {length: endPage - startPage + 1},
        (_, i) => startPage + i
    );

    const getHref = (page: number) => {
        const newParams = new URLSearchParams(params);
        newParams.set("page", page.toString());

        if (searchName) {
            return `/admin/${searchName}/${page}?${newParams.toString()}`;
        }

        if (userName){
            return `/my-account/my-comments/${userName}?${newParams.toString()}`;
        }

        if (likesPage){
            return `/dashboard/likes?${newParams.toString()}`;
        }

        return `/dashboard/books?${newParams.toString()}`;
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