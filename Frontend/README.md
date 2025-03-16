npm i - інсталювати модулі
npm run build - збілдити проект
npm install react@18.3.1 react-dom@18.3.1 next@15.2.2
npm run lint - перевірити на помилки код
npm run start/ npm start - запуск проекта
npm run dev - для роботи з кодом та його оновлення у реальному часі

Оновлений tsconfig.json
json
Copy
Edit
{
"compilerOptions": {
"target": "ES2017",
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"strict": true,
"noEmit": true,
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "node",
"resolveJsonModule": true,
"isolatedModules": true,
"jsx": "react-jsx",
"incremental": true,
"forceConsistentCasingInFileNames": true,
"plugins": [
{
"name": "next"
}
],
"paths": {
"@/_": ["./src/_"]
}
},
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
"exclude": ["node_modules"]
}

очистіть кеш і запустіть білд знову:

sh
Copy
Edit
rm -rf .next node_modules package-lock.json
npm install
npm run build

src/
├── app/
│ ├── layout.tsx // Головний шаблон (з Header і Footer)
│ ├── page.tsx // Головна сторінка (опціонально)
│ ├── books/ // 📚 Сторінка каталогу книг
│ │ ├── page.tsx
│ ├── authors/ // ✍ Сторінка авторів
│ │ ├── page.tsx
├── components/ // 📌 Реюзабельні компоненти
│ ├── Header.tsx // Компонент шапки
│ ├── Footer.tsx // Компонент футера
├── styles/ // Стилі (опціонально)
│ ├── globals.css

📂 src/  
├── 📂 app/ # Next.js сторінки
│ ├── 📜 layout.tsx # Глобальний шаблон
│ ├── 📜 page.tsx # Головна сторінка
│ ├── 📂 dashboard/ # Інші сторінки
│ ├── 📂 api/ # API-ендпоінти (опціонально)
│ ├── 📂 auth/ # Логін / Реєстрація (опціонально)
│
├── 📂 components/ # Повторно використовувані компоненти
│ ├── 📂 ui/ # Базові UI-компоненти (Button, Input)
│ ├── 📂 header/ # Хедер
│ ├── 📂 modal/ # Модальне вікно
│
├── 📂 shared/ # 📌 Спільні ресурси
│ ├── 📂 hooks/ # 🔹 Кастомні React-хуки
│ │ ├── 📜 useAuth.ts # Хук для авторизації
│ │ ├── 📜 useTheme.ts # Хук для теми
│ │  
│ ├── 📂 utils/ # 🔹 Хелпери та функції
│ │ ├── 📜 formatDate.ts # Функція форматування дати
│ │ ├── 📜 generateID.ts # Функція генерації унікального ID
│ │  
│ ├── 📂 context/ # 🔹 React-контексти
│ │ ├── 📜 AuthContext.ts # Контекст авторизації
│ │ ├── 📜 ThemeContext.ts # Контекст теми
│ │  
│ ├── 📂 services/ # 🔹 API-запити
│ │ ├── 📜 authService.ts # Запити для входу/реєстрації
│ │ ├── 📜 bookService.ts # API-запити для книг
│
├── 📂 styles/ # Глобальні стилі
│ ├── 📜 globals.css # Основні стилі

Що зазвичай зберігається у shared/?
📂 Папка 📝 Що містить?
shared/hooks/ Кастомні React-хуки (useAuth.ts, useTheme.ts)
shared/utils/ Хелпери (форматування дати, генерація ID тощо)
shared/context/ React-контексти (AuthContext.ts, ThemeContext.ts)
shared/services/ Функції для API-запитів (authService.ts, bookService.ts)
✅ Приклад використання shared/hooks/useAuth.ts
📁 src/shared/hooks/useAuth.ts

tsx
Copy
Edit
import { useState, useEffect } from "react";

export const useAuth = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
const token = localStorage.getItem("token");
setIsAuthenticated(!!token);
}, []);

return { isAuthenticated };
};
📁 src/components/header/Header.tsx

tsx
Copy
Edit
"use client";

import { useAuth } from "@/shared/hooks/useAuth";

const Header = () => {
const { isAuthenticated } = useAuth();

return (

<header>
<h1>Моя бібліотека</h1>
{isAuthenticated ? <button>Вийти</button> : <button>Увійти</button>}
</header>
);
};

export default Header;

/////////////////////////////////////////////////////////

. Оновлена структура проєкту
perl
Copy
Edit
📂 my-app/
├── 📂 src/
│ ├── 📂 app/
│ │ ├── 📜 layout.tsx # Глобальний шаблон
│ │ ├── 📜 page.tsx # Головна сторінка
│
│ ├── 📂 components/
│ │ ├── 📂 ui/ # 📌 Базові UI-компоненти (Button, Input)
│ │ ├── 📂 modal/ # 📌 Компонент модального вікна
│ │ │ ├── 📜 Modal.tsx # 🔹 Універсальне модальне вікно
│ │ ├── 📂 auth/ # 📌 Форми авторизації
│ │ │ ├── 📜 SignInForm.tsx # 🔹 Форма входу
│ │ │ ├── 📜 SignUpForm.tsx # 🔹 Форма реєстрації
│ │ │ ├── 📜 AuthModal.tsx # 🔹 Модальне вікно для входу та реєстрації
│ │ ├── 📂 header/ # 📌 Хедер з кнопкою входу
│
│ ├── 📂 shared/
│ │ ├── 📂 validation/ # 📌 Валідація форм
│ │ │ ├── 📜 userValidation.ts # 🔹 Валідація входу/реєстрації
│
│ ├── 📂 styles/
│ │ ├── 📜 globals.css # Глобальні стилі
✅ 2. Оновлюємо userValidation.ts
📁 src/shared/validation/userValidation.ts

ts
Copy
Edit
import \* as yup from "yup";

export const userSignInValidationSchema = yup.object().shape({
email: yup.string().email("Некоректний email").required("Email обов'язковий"),
password: yup.string().min(6, "Пароль має містити мінімум 6 символів").required("Пароль обов'язковий"),
});

export const userSignUpValidationSchema = yup.object().shape({
email: yup.string().email("Некоректний email").required("Email обов'язковий"),
password: yup.string().min(6, "Пароль має містити мінімум 6 символів").required("Пароль обов'язковий"),
confirmPassword: yup
.string()
.oneOf([yup.ref("password"), null], "Паролі мають збігатися")
.required("Підтвердження паролю обов'язкове"),
});
📌 Одна валідація для SignInForm та SignUpForm.

✅ 3. Оновлюємо SignInForm.tsx та SignUpForm.tsx
📁 src/components/auth/SignInForm.tsx

tsx
Copy
Edit
"use client";

import { useAppForm } from "@/shared/hooks/useAppForm";
import { userSignInValidationSchema } from "@/shared/validation/userValidation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "./AuthForm.module.css";

const DEFAULT_SIGN_IN_PAYLOAD = { email: "", password: "" };

const SignInForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
const { control, errors, handleSubmit } = useAppForm({
defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
validationSchema: userSignInValidationSchema,
});

return (

<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
<Input type="email" label="E-mail" placeholder="E-mail address" name="email" control={control} errors={errors} />
<Input type="password" label="Password" placeholder="Password" name="password" control={control} errors={errors} />
<Button className={styles.button} type="submit">Log In</Button>
</form>
);
};

export default SignInForm;
📁 src/components/auth/SignUpForm.tsx

tsx
Copy
Edit
"use client";

import { useAppForm } from "@/shared/hooks/useAppForm";
import { userSignUpValidationSchema } from "@/shared/validation/userValidation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "./AuthForm.module.css";

const DEFAULT_SIGN_UP_PAYLOAD = { email: "", password: "", confirmPassword: "" };

const SignUpForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
const { control, errors, handleSubmit } = useAppForm({
defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
validationSchema: userSignUpValidationSchema,
});

return (

<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
<Input type="email" label="E-mail" placeholder="E-mail address" name="email" control={control} errors={errors} />
<Input type="password" label="Password" placeholder="Password" name="password" control={control} errors={errors} />
<Input type="password" label="Confirm Password" placeholder="Confirm Password" name="confirmPassword" control={control} errors={errors} />
<Button className={styles.button} type="submit">Sign Up</Button>
</form>
);
};

export default SignUpForm;
✅ 4. Додаємо модальне вікно з вкладками
📁 src/components/auth/AuthModal.tsx

tsx
Copy
Edit
"use client";

import { useState } from "react";
import Modal from "@/components/modal/Modal";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import styles from "./AuthModal.module.css";

interface AuthModalProps {
isOpen: boolean;
onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
const [isSignIn, setIsSignIn] = useState(true);

return (
<Modal isOpen={isOpen} onClose={onClose}>

<div className={styles.tabs}>
<button className={isSignIn ? styles.active : ""} onClick={() => setIsSignIn(true)}>Увійти</button>
<button className={!isSignIn ? styles.active : ""} onClick={() => setIsSignIn(false)}>Зареєструватися</button>
</div>
{isSignIn ? <SignInForm onSubmit={(data) => console.log("Login data:", data)} /> : <SignUpForm onSubmit={(data) => console.log("Sign Up data:", data)} />}
</Modal>
);
};

export default AuthModal;
📌 Тепер одна модалка підтримує і вхід, і реєстрацію.

✅ 5. Використовуємо AuthModal в Header.tsx
📁 src/components/header/Header.tsx

tsx
Copy
Edit
"use client";

import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import styles from "./Header.module.css";

const Header = () => {
const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

return (

<header className={styles.header}>
<h1 className={styles.title}>Моя бібліотека</h1>
<button className={styles.loginButton} onClick={() => setIsAuthModalOpen(true)}>Увійти</button>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>

);
};

export default Header;
✅ Що тепер працює?
✅ Кнопка "Увійти" відкриває модальне вікно
✅ В модальному вікні є вкладки "Вхід" та "Реєстрація"
✅ Форми мають валідацію

💡 Тепер це зручна та масштабована система авторизації! 🚀

You said:
тоді пропиши ієрархію, так щоб було все те що ти вже показав, + додаткове
конфігурація роутерів
константи
енамс
стор, щоб передавати дані в компоненти не через пропси та описати +- реалізацію
auth-api
services
нотифікація сервісів
ChatGPT said:
Ось повна структура проєкту Next.js, враховуючи всі ваші вимоги:

Авторизація через модальне вікно
Форми входу та реєстрації з валідацією
Стейт-менеджмент (store)
API для авторизації (auth-api)
Конфігурація роутерів
Сервіси (services/)
Константи (constants/)
Перерахування (enums/)
Нотифікація (notifications/)
✅ Повна структура проєкту
python
Copy
Edit
📂 my-app/
├── 📂 src/
│ ├── 📂 app/ # 📌 Next.js сторінки
│ │ ├── 📜 layout.tsx # Глобальний шаблон
│ │ ├── 📜 page.tsx # Головна сторінка
│
│ ├── 📂 components/ # 📌 UI та інші компоненти
│ │ ├── 📂 ui/ # 🔹 Базові UI-компоненти (Button, Input)
│ │ ├── 📂 modal/ # 🔹 Універсальне модальне вікно
│ │ ├── 📂 auth/ # 🔹 Авторизація (форми, модалка)
│ │ │ ├── 📜 SignInForm.tsx # Форма входу
│ │ │ ├── 📜 SignUpForm.tsx # Форма реєстрації
│ │ │ ├── 📜 AuthModal.tsx # Модальне вікно для входу/реєстрації
│ │ ├── 📂 header/ # 🔹 Хедер з кнопкою входу
│
│ ├── 📂 shared/ # 📌 Спільні ресурси
│ │ ├── 📂 validation/ # 🔹 Валідація форм
│ │ │ ├── 📜 userValidation.ts # Валідація входу/реєстрації
│ │ ├── 📂 hooks/ # 🔹 Кастомні React-хуки
│ │ │ ├── 📜 useAuth.ts # Хук авторизації
│ │ ├── 📂 services/ # 🔹 API-запити
│ │ │ ├── 📜 authService.ts # API-запити для авторизації
│ │ │ ├── 📜 userService.ts # API-запити для користувачів
│ │ ├── 📂 store/ # 🔹 Redux/Zustand store
│ │ │ ├── 📜 authStore.ts # Стейт авторизації
│ │ │ ├── 📜 rootStore.ts # Глобальний store
│ │ ├── 📂 constants/ # 🔹 Константи
│ │ │ ├── 📜 appConstants.ts # Глобальні константи
│ │ ├── 📂 enums/ # 🔹 Перерахування (Enums)
│ │ │ ├── 📜 AuthEnum.ts # Enum для авторизації
│ │ ├── 📂 notifications/ # 🔹 Нотифікації
│ │ │ ├── 📜 notificationService.ts # Сервіс нотифікацій
│
│ ├── 📂 config/ # 📌 Конфігурація
│ │ ├── 📜 router.ts # Конфігурація маршрутів
│ │ ├── 📜 apiConfig.ts # Базова конфігурація API
│
│ ├── 📂 styles/ # Глобальні стилі
│ │ ├── 📜 globals.css # Основні стилі
│
│ ├── 📜 next.config.js # Конфігурація Next.js
│ ├── 📜 tsconfig.json # Конфігурація TypeScript
│ ├── 📜 package.json # Файл залежностей
└── 📜 .gitignore # Файл ігнорування Git
✅ Опис реалізації
🔹 1. API для авторизації (authService.ts)
📁 src/shared/services/authService.ts

ts
Copy
Edit
import axios from "@/config/apiConfig";

export const login = async (email: string, password: string) => {
const response = await axios.post("/auth/login", { email, password });
return response.data;
};

export const register = async (email: string, password: string) => {
const response = await axios.post("/auth/register", { email, password });
return response.data;
};
📌 Використання в SignInForm.tsx:

tsx
Copy
Edit
import { login } from "@/shared/services/authService";

const handleLogin = async (data) => {
try {
const response = await login(data.email, data.password);
console.log("Успішний вхід:", response);
} catch (error) {
console.error("Помилка входу:", error);
}
};
🔹 2. Стейт-менеджмент (Zustand)
📁 src/shared/store/authStore.ts

ts
Copy
Edit
import { create } from "zustand";

interface AuthState {
isAuthenticated: boolean;
login: () => void;
logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
isAuthenticated: false,
login: () => set({ isAuthenticated: true }),
logout: () => set({ isAuthenticated: false }),
}));
📌 Використання в Header.tsx:

tsx
Copy
Edit
import { useAuthStore } from "@/shared/store/authStore";

const { isAuthenticated, login, logout } = useAuthStore();

<button onClick={isAuthenticated ? logout : login}>
{isAuthenticated ? "Вийти" : "Увійти"}
</button>;
🔹 3. Константи (appConstants.ts)
📁 src/shared/constants/appConstants.ts

ts
Copy
Edit
export const API_BASE_URL = "https://api.example.com";
📌 Використання в apiConfig.ts:

ts
Copy
Edit
import axios from "axios";
import { API_BASE_URL } from "@/shared/constants/appConstants";

export default axios.create({
baseURL: API_BASE_URL,
headers: { "Content-Type": "application/json" },
});
🔹 4. Перерахування (AuthEnum.ts)
📁 src/shared/enums/AuthEnum.ts

ts
Copy
Edit
export enum AuthStatus {
LOGGED_IN = "logged_in",
LOGGED_OUT = "logged_out",
}
📌 Використання:

ts
Copy
Edit
import { AuthStatus } from "@/shared/enums/AuthEnum";

const status: AuthStatus = AuthStatus.LOGGED_IN;
🔹 5. Нотифікація (notificationService.ts)
📁 src/shared/notifications/notificationService.ts

ts
Copy
Edit
import toast from "react-hot-toast";

export const notifySuccess = (message: string) => {
toast.success(message);
};

export const notifyError = (message: string) => {
toast.error(message);
};
📌 Використання в SignInForm.tsx:

ts
Copy
Edit
import { notifySuccess, notifyError } from "@/shared/notifications/notificationService";

const handleLogin = async (data) => {
try {
await login(data.email, data.password);
notifySuccess("Успішний вхід!");
} catch (error) {
notifyError("Помилка входу!");
}
};
✅ Що це дає?
✔ Модульність → Код добре організований і легко підтримується
✔ Перевикористання → API, хелпери, константи використовуються у всьому проєкті
✔ Чистота коду → Всі сервіси, валідація, стейт-менеджмент винесені в окремі файли
✔ Масштабованість → Легко додавати нові фічі без рефакторингу

💡 Ця структура допоможе вам створити потужний Next.js проєкт! 🚀

You said:
додай ще ті дві сторінки що я казав
ChatGPT said:
Ось повна структура проєкту Next.js, тепер із двома додатковими сторінками:

✅ Авторизація через модальне вікно
✅ Форми входу та реєстрації з валідацією
✅ Стейт-менеджмент (store)
✅ API для авторизації (auth-api)
✅ Конфігурація роутерів
✅ Сервіси (services/)
✅ Константи (constants/)
✅ Перерахування (enums/)
✅ Нотифікація (notifications/)
✅ Сторінки Каталог книг та Автори

✅ Оновлена структура проєкту
python
Copy
Edit
📂 my-app/
├── 📂 src/
│ ├── 📂 app/ # 📌 Next.js сторінки
│ │ ├── 📂 books/ # 📌 Сторінка Каталогу книг
│ │ │ ├── 📜 page.tsx # Головна сторінка каталогу книг
│ │ │ ├── 📜 BookList.tsx # Компонент списку книг
│ │ ├── 📂 authors/ # 📌 Сторінка Авторів
│ │ │ ├── 📜 page.tsx # Головна сторінка авторів
│ │ │ ├── 📜 AuthorList.tsx # Компонент списку авторів
│ │ ├── 📜 layout.tsx # Глобальний шаблон
│ │ ├── 📜 page.tsx # Головна сторінка
│
│ ├── 📂 components/ # 📌 UI та інші компоненти
│ │ ├── 📂 ui/ # 🔹 Базові UI-компоненти (Button, Input)
│ │ ├── 📂 modal/ # 🔹 Універсальне модальне вікно
│ │ ├── 📂 auth/ # 🔹 Авторизація (форми, модалка)
│ │ │ ├── 📜 SignInForm.tsx # Форма входу
│ │ │ ├── 📜 SignUpForm.tsx # Форма реєстрації
│ │ │ ├── 📜 AuthModal.tsx # Модальне вікно для входу/реєстрації
│ │ ├── 📂 header/ # 🔹 Хедер з кнопкою входу
│
│ ├── 📂 shared/ # 📌 Спільні ресурси
│ │ ├── 📂 validation/ # 🔹 Валідація форм
│ │ │ ├── 📜 userValidation.ts # Валідація входу/реєстрації
│ │ ├── 📂 hooks/ # 🔹 Кастомні React-хуки
│ │ │ ├── 📜 useAuth.ts # Хук авторизації
│ │ ├── 📂 services/ # 🔹 API-запити
│ │ │ ├── 📜 authService.ts # API-запити для авторизації
│ │ │ ├── 📜 bookService.ts # API-запити для книг
│ │ │ ├── 📜 authorService.ts # API-запити для авторів
│ │ ├── 📂 store/ # 🔹 Redux/Zustand store
│ │ │ ├── 📜 authStore.ts # Стейт авторизації
│ │ │ ├── 📜 rootStore.ts # Глобальний store
│ │ ├── 📂 constants/ # 🔹 Константи
│ │ │ ├── 📜 appConstants.ts # Глобальні константи
│ │ ├── 📂 enums/ # 🔹 Перерахування (Enums)
│ │ │ ├── 📜 AuthEnum.ts # Enum для авторизації
│ │ ├── 📂 notifications/ # 🔹 Нотифікації
│ │ │ ├── 📜 notificationService.ts # Сервіс нотифікацій
│
│ ├── 📂 config/ # 📌 Конфігурація
│ │ ├── 📜 router.ts # Конфігурація маршрутів
│ │ ├── 📜 apiConfig.ts # Базова конфігурація API
│
│ ├── 📂 styles/ # Глобальні стилі
│ │ ├── 📜 globals.css # Основні стилі
│
│ ├── 📜 next.config.js # Конфігурація Next.js
│ ├── 📜 tsconfig.json # Конфігурація TypeScript
│ ├── 📜 package.json # Файл залежностей
└── 📜 .gitignore # Файл ігнорування Git
✅ 1. Реалізація Каталог книг
📁 src/app/books/page.tsx

tsx
Copy
Edit
import BookList from "./BookList";

export default function BooksPage() {
return (

<div>
<h2>Каталог книг</h2>
<BookList />
</div>
);
}
📁 src/app/books/BookList.tsx

tsx
Copy
Edit
import { useEffect, useState } from "react";
import { getBooks } from "@/shared/services/bookService";

export default function BookList() {
const [books, setBooks] = useState([]);

useEffect(() => {
getBooks().then(setBooks);
}, []);

return (

<ul>
{books.map((book) => (
<li key={book.id}>{book.title} - {book.author}</li>
))}
</ul>
);
}
📁 src/shared/services/bookService.ts

ts
Copy
Edit
import axios from "@/config/apiConfig";

export const getBooks = async () => {
const response = await axios.get("/books");
return response.data;
};
✅ 2. Реалізація Автори
📁 src/app/authors/page.tsx

tsx
Copy
Edit
import AuthorList from "./AuthorList";

export default function AuthorsPage() {
return (

<div>
<h2>Список авторів</h2>
<AuthorList />
</div>
);
}
📁 src/app/authors/AuthorList.tsx

tsx
Copy
Edit
import { useEffect, useState } from "react";
import { getAuthors } from "@/shared/services/authorService";

export default function AuthorList() {
const [authors, setAuthors] = useState([]);

useEffect(() => {
getAuthors().then(setAuthors);
}, []);

return (

<ul>
{authors.map((author) => (
<li key={author.id}>{author.name}</li>
))}
</ul>
);
}
📁 src/shared/services/authorService.ts

ts
Copy
Edit
import axios from "@/config/apiConfig";

export const getAuthors = async () => {
const response = await axios.get("/authors");
return response.data;
};
✅ Що тепер працює?
✔ Головна сторінка (/)
✔ Сторінка "Каталог книг" (/books)
✔ Сторінка "Автори" (/authors)
✔ API для отримання книг і авторів
✔ Модальне вікно для входу/реєстрації
✔ Нотифікації, збереження авторизації через Zustand

💡 Тепер у вас повноцінний Next.js-проєкт, готовий до розширення! 🚀

You said:
а де ділись types
utils
context
додай якщо вони потрібні
ChatGPT said:
Ось фінальна структура проєкту Next.js з урахуванням:

✅ Авторизації через модальне вікно
✅ Сторінок "Каталог книг" та "Автори"
✅ Валідації, API, стейт-менеджменту, нотифікацій
✅ Додано types/, utils/, context/

✅ Остаточна структура проєкту
python
Copy
Edit
📂 my-app/
├── 📂 src/
│ ├── 📂 app/ # 📌 Next.js сторінки
│ │ ├── 📂 books/ # 📌 Каталог книг
│ │ │ ├── 📜 page.tsx # Головна сторінка каталогу книг
│ │ │ ├── 📜 BookList.tsx # Компонент списку книг
│ │ ├── 📂 authors/ # 📌 Автори
│ │ │ ├── 📜 page.tsx # Головна сторінка авторів
│ │ │ ├── 📜 AuthorList.tsx # Компонент списку авторів
│ │ ├── 📜 layout.tsx # Глобальний шаблон
│ │ ├── 📜 page.tsx # Головна сторінка
│
│ ├── 📂 components/ # 📌 UI та інші компоненти
│ │ ├── 📂 ui/ # 🔹 Базові UI-компоненти (Button, Input)
│ │ ├── 📂 modal/ # 🔹 Універсальне модальне вікно
│ │ ├── 📂 auth/ # 🔹 Авторизація (форми, модалка)
│ │ │ ├── 📜 SignInForm.tsx # Форма входу
│ │ │ ├── 📜 SignUpForm.tsx # Форма реєстрації
│ │ │ ├── 📜 AuthModal.tsx # Модальне вікно для входу/реєстрації
│ │ ├── 📂 header/ # 🔹 Хедер з кнопкою входу
│
│ ├── 📂 shared/ # 📌 Спільні ресурси
│ │ ├── 📂 validation/ # 🔹 Валідація форм
│ │ │ ├── 📜 userValidation.ts # Валідація входу/реєстрації
│ │ ├── 📂 hooks/ # 🔹 Кастомні React-хуки
│ │ │ ├── 📜 useAuth.ts # Хук авторизації
│ │ ├── 📂 services/ # 🔹 API-запити
│ │ │ ├── 📜 authService.ts # API-запити для авторизації
│ │ │ ├── 📜 bookService.ts # API-запити для книг
│ │ │ ├── 📜 authorService.ts # API-запити для авторів
│ │ ├── 📂 store/ # 🔹 Redux/Zustand store
│ │ │ ├── 📜 authStore.ts # Стейт авторизації
│ │ │ ├── 📜 rootStore.ts # Глобальний store
│ │ ├── 📂 constants/ # 🔹 Константи
│ │ │ ├── 📜 appConstants.ts # Глобальні константи
│ │ ├── 📂 enums/ # 🔹 Перерахування (Enums)
│ │ │ ├── 📜 AuthEnum.ts # Enum для авторизації
│ │ ├── 📂 notifications/ # 🔹 Нотифікації
│ │ │ ├── 📜 notificationService.ts # Сервіс нотифікацій
│ │ ├── 📂 utils/ # 🔹 Хелпери та утиліти
│ │ │ ├── 📜 formatDate.ts # Функція форматування дати
│ │ │ ├── 📜 generateID.ts # Функція генерації унікального ID
│ │ ├── 📂 context/ # 🔹 React-контексти
│ │ │ ├── 📜 AuthContext.ts # Контекст авторизації
│ │ │ ├── 📜 ThemeContext.ts # Контекст теми
│ │ ├── 📂 types/ # 🔹 Типи TypeScript
│ │ │ ├── 📜 authTypes.ts # Типи для авторизації
│ │ │ ├── 📜 bookTypes.ts # Типи для книг
│ │ │ ├── 📜 userTypes.ts # Типи для користувачів
│
│ ├── 📂 config/ # 📌 Конфігурація
│ │ ├── 📜 router.ts # Конфігурація маршрутів
│ │ ├── 📜 apiConfig.ts # Базова конфігурація API
│
│ ├── 📂 styles/ # Глобальні стилі
│ │ ├── 📜 globals.css # Основні стилі
│
│ ├── 📜 next.config.js # Конфігурація Next.js
│ ├── 📜 tsconfig.json # Конфігурація TypeScript
│ ├── 📜 package.json # Файл залежностей
└── 📜 .gitignore # Файл ігнорування Git
✅ Що нового?
🔹 1. Додано types/ для перевикористовуваних типів
📁 src/shared/types/authTypes.ts

ts
Copy
Edit
export interface User {
id: string;
email: string;
token?: string;
}
📌 Використання:

ts
Copy
Edit
import { User } from "@/shared/types/authTypes";

const user: User = { id: "123", email: "test@example.com" };
🔹 2. Додано utils/ для хелперів
📁 src/shared/utils/formatDate.ts

ts
Copy
Edit
export const formatDate = (date: string): string => {
return new Date(date).toLocaleDateString("uk-UA");
};
📌 Використання:

ts
Copy
Edit
import { formatDate } from "@/shared/utils/formatDate";

console.log(formatDate("2024-03-10"));
🔹 3. Додано context/ для глобального стейту
📁 src/shared/context/AuthContext.tsx

tsx
Copy
Edit
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
user: string | null;
login: (user: string) => void;
logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<string | null>(null);

const login = (user: string) => setUser(user);
const logout = () => setUser(null);

return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) throw new Error("useAuth must be used within an AuthProvider");
return context;
};
📌 Використання в layout.tsx

tsx
Copy
Edit
import { AuthProvider } from "@/shared/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (

<html lang="uk">
<body>
<AuthProvider>{children}</AuthProvider>
</body>
</html>
);
}
✅ Що тепер працює?
✔ Типізація (types/)
✔ Корисні функції (utils/)
✔ Глобальний контекст (context/)

💡 Ця структура готова для продакшну та масштабування! 🚀
