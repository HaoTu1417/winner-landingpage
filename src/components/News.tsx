interface NewsArticle {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  date_created?: string;
  type?: string;
}

export default NewsArticle;
