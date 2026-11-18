import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig, type BlogPost } from "@/config/site";
import SEOHead from "@/components/kit/SEOHead";
import BlurReveal from "@/components/kit/BlurReveal";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "CAC Troubleshooting", "DIY Registration", "Business Strategy", "Name Search"];

  const posts = siteConfig.blogPosts;

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const featuredPost = posts[0];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <SEOHead seo={siteConfig.seo.pages.blog} />

      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <BlurReveal as="div">
            <span className="inline-block rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 font-mono">
              CAC Registration Blog & Tutorials
            </span>
          </BlurReveal>
          <BlurReveal as="h1" delay={0.05} className="text-[length:var(--text-display)] font-bold tracking-tight text-white">
            Master the CAC Portal & Grow Your Business
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-zinc-400 leading-relaxed">
            Step-by-step guides, rejection fixes, name approval strategies, and official CAC updates written specifically for Nigerian founders.
          </BlurReveal>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                  : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article (when 'All' is selected) */}
        {selectedCategory === "All" && featuredPost && (
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-zinc-900/80 backdrop-blur-md p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-amber-500/20 text-amber-300 px-3 py-1 font-semibold font-mono border border-amber-500/30">
                    ⭐ Featured Tutorial
                  </span>
                  <span className="text-zinc-400">• {featuredPost.readTime}</span>
                  <span className="text-zinc-400">• {featuredPost.publishedDate}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white hover:text-amber-400 transition-colors">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                    <div className="text-[11px] text-amber-400">{featuredPost.author.role}</div>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Read Guide →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[240px] rounded-2xl overflow-hidden border border-zinc-800">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover saturate-[0.9] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: BlogPost) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800/80 mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-black/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-amber-400 border border-amber-500/30 font-mono">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2">
                  <span>{post.publishedDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug mb-2 line-clamp-2">
                  <Link to={`/blog/${post.slug}`} className="focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-zinc-700"
                  />
                  <span className="text-[11px] font-medium text-zinc-300">{post.author.name}</span>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-zinc-900 to-amber-950/20 p-8 text-center space-y-4 max-w-3xl mx-auto shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Ready to Register Your Business with CAC This Week?
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 max-w-xl mx-auto">
            Skip agent markups and confusing portal queries. Download our complete step-by-step guide for ₦10,000 or let us walk you through live on screen for ₦25,000.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/ebook"
              className="rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-black hover:bg-amber-400 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Get Ebook Guide — ₦10,000
            </Link>
            <Link
              to="/do-it-with-us"
              className="rounded-xl border border-amber-500/50 bg-amber-500/10 px-6 py-3 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Do It With Us — ₦25,000
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
