import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

async function getSingleBlog(context: any) {
  const {slug} = context.params;
  const data = await import(`../../../data/${slug}.md`);
  const singleDocument = matter(data.default);

  return {
    singleDocument: singleDocument
  };
}

const SingleBlog = async (props: any) => {
  const {singleDocument} = await getSingleBlog(props);
  return (
    <>
      <div>

      </div>
      <div>
        <div>
          <h1>{singleDocument.data.title}</h1>
          <p>{singleDocument.data.date}</p>
          <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;

export async function generateStaticParams() {
  async function getAllBlogs() {
    const files = fs.readdirSync(path.join("data"));
    const blogs = files.map((fileName) => {
      const slug = fileName.replace(".md", "");
      const f = fs.readFileSync(
        path.join("data", fileName),
        "utf-8",
      );
      const {data} = matter(f);
      return {
        frontmatter: data,
        slug: slug,
      };
    });

    return {
      blogs: blogs
    };
  }

  const {blogs} = await getAllBlogs();
  return blogs.map((blog) => `/${blog.slug}`);
}