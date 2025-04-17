// "use client";
// import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
// import { JSX, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// // import Link from "next/link";
// import { Button } from "@/components/ui/button/Button";
// import { useRouter } from "next/navigation";
// type Category = {
//   id: string;
//   name: string;
//   parentId: string | null;
// };

// // create category
// type CreateCategoryFormData = {
//   name: string;
//   parentId?: string;
// };

// export default function Dashboard() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   // create category
//   const [createSuccess, setCreateSuccess] = useState<string | null>(null);
//   const [createError, setCreateError] = useState<string | null>(null);
//   const { register, handleSubmit, reset } = useForm<CreateCategoryFormData>();

//   useEffect(() => {
//     fetchCategories({ page: 1, limit: 100 })
//       .then((data) => setCategories(data.entities))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   function handleClick(id: string) {
//     router.push(`/dashboard/${id}`);
//   }

//   console.log(categories);

//   function toggleCategory(id: string) {
//     setExpandedCategoryIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   }

//   const buildTree = (parentId: string | null): JSX.Element[] => {
//     return categories
//       .filter((cat) => cat.parentId === parentId)
//       .map((cat) => {
//         const isExpanded = expandedCategoryIds.includes(cat.id);
//         const hasChildren = categories.some(
//           (child) => child.parentId === cat.id
//         );

//         return (
//           <li key={cat.id} style={{ marginLeft: parentId ? 20 : 0 }}>
//             <div
//               onClick={() => toggleCategory(cat.id)}
//               style={{ cursor: hasChildren ? "pointer" : "default" }}
//             >
//               <strong>{cat.name}</strong>
//               <Button onClick={() => handleClick(cat.id)}>Go to Book</Button>
//             </div>

//             {isExpanded && hasChildren && <ul>{buildTree(cat.id)}</ul>}
//           </li>
//         );
//       });
//   };

//   if (loading) return <div>Завантаження...</div>;
//   if (error) return <div>Помилка: {error}</div>;

//   // create category
//   const onCreateCategory = async (data: CreateCategoryFormData) => {
//     const payload = {
//       name: data.name,
//       parentId: data.parentId === "" ? null : data.parentId,
//     };

//     try {
//       const response = await axiosInstance.post("/category/create", payload);
//       const newCategory = response.data;
//       setCreateSuccess(`Створено: ${response.data.name}`);
//       reset();
//       setCategories((prev) => [...prev, newCategory]);
//       // fetchCategories({ page: 1, limit: 100 }).then((data) =>
//       // setCategories(data.entities)
//       // );
//     } catch (err) {
//       setCreateError("Помилка при створенні");
//     }
//   };

//   return (
//     <div>
//       <h1>Категорії отримати всі, та отримати одну</h1>
//       <ul>{buildTree(null)}</ul>
//       {/* create category*/}
//       <h1>Створити категорію</h1>
//       <form
//         onSubmit={handleSubmit(onCreateCategory)}
//         style={{ maxWidth: 400, marginTop: 20 }}
//       >
//         <div>
//           <label>Назва категорії</label>
//           <input
//             {...register("name", { required: true })}
//             placeholder="Назва"
//           />
//         </div>
//         <div>
//           <label>Батьківська категорія (опціонально)</label>
//           <select {...register("parentId")}>
//             <option value="">— Без батьківської —</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Створити</button>
//         {createSuccess && <p style={{ color: "green" }}>{createSuccess}</p>}
//         {createError && <p style={{ color: "red" }}>{createError}</p>}
//       </form>
//       <h1>Оновити категорію</h1>
//     </div>
//   );
// }

// async function fetchCategories({
//   page = 1,
//   limit = 10,
//   sort = "name",
//   order = "ASC",
//   parentId,
//   name,
// }: {
//   page?: number;
//   limit?: number;
//   sort?: string;
//   order?: "ASC" | "DESC";
//   parentId?: string;
//   name?: string;
// } = {}) {
//   const params = new URLSearchParams({
//     page: String(page),
//     limit: String(limit),
//     sort,
//     order,
//   });

//   if (parentId) params.append("parentId", parentId);
//   if (name) params.append("name", name);

//   const response = await axiosInstance.get(
//     `/category/list?${params.toString()}`
//   );

//   return response.data;
// }
