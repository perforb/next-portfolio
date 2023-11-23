import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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

  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id;
  });

  return {
    blogs: orderedBlogs
  };
}

const Blog = async () => {
  const {blogs} = await getAllBlogs();
  return (
    <>
      <div>
        <div>
          <h1>Blog page</h1>
          <p>Show you interesting posts!</p>
          {blogs.map((blog, index) =>
            <div key={index}>
              <h2>{blog.frontmatter.title}</h2>
              <p>{blog.frontmatter.date}</p>
              <Link href={`/blog/${blog.slug}`}>Read More</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;