// import { useEffect, useState } from "react";


// import NewsArticle from "@/components/News";
// import NewsService from "@/services/NewsService"

// async function getNewsItem(id: string) {
//     const res = await fetch(`https://your-directus-instance.com/items/news/${id}`);
//     if (!res.ok) throw new Error("News not found");
//     return res.json();
// }

// export default async function NewsDetail({ params }: { params: { id: string } }) {
//     const newSBackend = process.env.NEXT_PUBLIC_NEWS_ARTICLE_BACKEND || "http://localhost:8055";
//     const newsService = new NewsService(newSBackend);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [page, setPage] = useState<number>(1);
//     const [newsData, setNewsData] = useState<NewsArticle | null>(null);
//   const pageSize = 5; // Define articles per page

//     useEffect(() => {
//         async function fetchNews() {
//           setLoading(true);
//           setError(null);
         
//           try {
//             if (id) {
//               // Fetch single news article by ID
//               //const response = await fetch(`http://localhost:8055/collections/news/${id}`);
    
//               const result = await newsService.getNewsById(id);
//               console.log("result",result);
    
//               //if (!response.ok) throw new Error("Failed to fetch news article");
//               //const data: NewsArticle = await response.json();
//               setNewsData(result.data);
//             } 
//           } catch (err) {
//             setError((err as Error).message);
//           }
    
//           setLoading(false);
//         }
    
//         fetchNews();
//       }, [id, page]); // Re-fetch when id or page changes


//     const newsItem = await getNewsItem(params.id);

//     return (
//         <div>
//             <h1>{newsItem.data.title}</h1>
//             <p>{newsItem.data.content}</p>
//         </div>
//     );
// }
