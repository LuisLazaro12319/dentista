import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ChevronRight, X, User, Check, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/dental';
import { BLOG_POSTS } from '../data/mockDentalData';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = ['todos', 'Ortodoncia', 'Implantes', 'Higiene y Prevención', 'Estética Dental'];

  const filteredPosts = selectedCategory === 'todos'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="blog" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
            <span>Divulgación Odontológica</span>
            <span aria-hidden="true">·</span>
            <span>Blog de Salud Bucal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Consejos clínicos y guías para cuidar tu sonrisa cada día
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Artículos redactados por nuestros doctores para resolver tus dudas sobre tratamientos, higiene y prevención dental.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg mt-8 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'todos' ? 'Todos los artículos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-xs p-5"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 pb-2.5 border-b border-slate-100">
                  <span className="font-semibold text-sky-800">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 hover:text-sky-700 transition-colors cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5">
                  {post.excerpt}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] font-medium text-slate-700 truncate max-w-[110px]">
                      {post.author.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
                  >
                    <span>Leer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-sky-800">{selectedPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author Byline */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-6">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{selectedPost.author.name}</p>
                <p className="text-[11px] text-slate-500">{selectedPost.author.role}</p>
              </div>
            </div>

            {/* Key Clinical Takeaways */}
            <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2">
                Puntos clave del artículo:
              </p>
              <ul className="space-y-1.5">
                {selectedPost.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-sky-950">
                    <Check className="w-3.5 h-3.5 text-sky-700 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              {selectedPost.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Bottom CTA to Book */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                ¿Tienes dudas sobre este tratamiento para tu caso?
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPost(null);
                  onOpenBooking();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <span>Pedir Cita con {selectedPost.author.name.split(' ')[1] || 'el Doctor'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
