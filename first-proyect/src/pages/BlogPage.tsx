// src/pages/BlogPage.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { mockBlogs } from '../interfaces/blogs.mock.ts';

export const BlogPage: FC = () => {
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h2>Nuestro Blog</h2>
      <p style={{ color: 'var(--muted)' }}>
        Entérate de las últimas novedades, inauguraciones y consejos para deportistas.
      </p>

      <div className="blog-list" style={{ marginTop: 24, display: 'grid', gap: '24px' }}>
        {mockBlogs.map((post) => (
          <div key={post.id} className="blog-post-summary" style={{ background: 'white', padding: 16, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 8 }} />
            <h3 style={{ marginTop: 12 }}>{post.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Por {post.author} • {post.date}
            </p>
            <p>{post.summary}</p>
            <Link to={`/blog/${post.id}`} state={{ post }} className="btn small">
              Leer más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;