'use client';

import styles from './styles.module.scss';

export default function AdminInstructions() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Вітаємо, Адміністраторе!</h1>
            <p>Дана сторінка створена для керування <strong className={styles.fatty}>товарами</strong>, <strong
                className={styles.fatty}>новинами</strong>, <strong
                className={styles.fatty}>категоріями</strong> та <strong
                className={styles.fatty}>користувачами</strong> сайту.</p>

            <h2 className={styles.chapter}>🔹 Розділ 1: Керування товарами</h2>
            <ul className={styles.list}>
                <li>Пошук книг за <strong className={styles.fatty}>назвою</strong> та <strong
                    className={styles.fatty}>станом</strong> (опублікована / неопублікована).
                </li>
                <li>Створення книг — просто введіть усі необхідні дані у форму.
                    <em>Уважно! Новостворені книги потрапляють у сховище неопублікованих!</em>
                </li>
                <li>Редагування книг — зручно змінюйте дані, наприклад ціну або виправляйте помилки.</li>
                <li>Видалення книг — для товарів, які більше не продаються.</li>
                <li>Публікація книг — після цього вони стають доступними покупцям.</li>
            </ul>

            <h2 className={styles.chapter}>🔹 Розділ 2: Новини</h2>
            <ul>
                <li>Пошук новин за <strong className={styles.fatty}>назвою</strong> та <strong
                    className={styles.fatty}>типом</strong> (general, promotion, event).
                </li>
                <li>Створення новин — заповніть всі необхідні дані у формі.</li>
                <li>Видалення новин — для неактуальних або помилкових записів.</li>
                <li>Редагування новин — для оновлення чи виправлення.</li>
            </ul>

            <h2 className={styles.chapter}>🔹 Розділ 3: Категорії</h2>
            <ul>
                <li>Перегляд усіх категорій та підкатегорій книг на сайті.</li>
                <li>Створення підкатегорій — натисніть кнопку у відповідній категорії й введіть назву.</li>
                <li>Редагування категорій та підкатегорій — зміни назви відображаються також у відповідних книжках.
                    <em>Уважно! Назви змінюються скрізь!</em>
                </li>
                <li>Видалення підкатегорій — для зайвих чи помилкових.
                    <em>Уважно! Основні категорії видалити неможливо!</em>
                </li>
            </ul>

            <h2 className={styles.chapter}>🔹 Розділ 4: Користувачі</h2>
            <ul>
                <li>Перегляд усіх зареєстрованих користувачів.</li>
                <li>Надання прав адміністратора іншим користувачам.
                    <em>Уважно! Усі адміністратори мають однакові права. Ви не можете забрати права в інших
                        адміністраторів. Зверніться до менеджера.</em>
                </li>
            </ul>

            <h3 className={styles.contacts}>📞 Контакти менеджера</h3>
            <p><strong className={styles.fatty}>Оксана</strong><br/>
                Телефон: <a className={styles.link} href="tel:0934246899">0934246899</a><br/>
                Email: <a className={styles.link} href="mailto:OksanaM@B-books.ua">OksanaM@B-books.ua</a>
            </p>
        </main>
    );
}
