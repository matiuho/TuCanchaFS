// src/pages/BlogDetail.tsx
import type { FC } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockBlogs } from '../interfaces/blogs.mock.ts';

export const BlogDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Busca el post del blog usando el ID de la URL.
  // El 'id' del mock es un número, así que lo convertimos.
  const post = mockBlogs.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="container" style={{ paddingTop: 24, textAlign: 'center' }}>
        <p>Entrada de blog no encontrada. Por favor, vuelve al listado.</p>
        <Link to="/blog" className="btn">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 24, maxWidth: 800, margin: '0 auto' }}>
      <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 10 }} />
      <h1 style={{ marginTop: 24 }}>{post.title}</h1>
      <p style={{ color: 'var(--muted)', borderBottom: '1px solid #eee', paddingBottom: 12 }}>
        Publicado por <strong>{post.author}</strong> el {post.date}
      </p>
      <div className="blog-content" style={{ marginTop: 20, lineHeight: 1.7 }}>
        <p>{post.content}</p>
      </div>
      <button className="btn secondary" onClick={() => navigate('/blog')} style={{ marginTop: 24 }}>Volver al Blog</button>
    </div>
  );
};

export default BlogDetail;