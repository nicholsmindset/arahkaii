
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  published_at: string;
  author_id: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      // Fetch the main post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (postError) throw postError;
      setPost(postData);

      // Fetch tags and categories for this post
      const { data: tagData } = await supabase
        .from('blog_post_tags')
        .select('blog_tags(*)')
        .eq('post_id', postData.id);

      const { data: categoryData } = await supabase
        .from('blog_post_categories')
        .select('blog_categories(*)')
        .eq('post_id', postData.id);

      setTags(tagData?.map(item => item.blog_tags).filter(Boolean) || []);
      setCategories(categoryData?.map(item => item.blog_categories).filter(Boolean) || []);

      // Fetch related posts
      const { data: relatedData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', postData.id)
        .order('published_at', { ascending: false })
        .limit(3);

      setRelatedPosts(relatedData || []);

      // Track page view
      trackPageView(postData.id);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackPageView = async (postId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const { data: existing } = await supabase
        .from('blog_analytics')
        .select('*')
        .eq('post_id', postId)
        .eq('date', today)
        .single();

      if (existing) {
        await supabase
          .from('blog_analytics')
          .update({ views: existing.views + 1 })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('blog_analytics')
          .insert({ post_id: postId, date: today, views: 1 });
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fashion-cream">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fashion-accent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-fashion-cream">
        <Header />
        <div className="pt-20 text-center py-16">
          <h1 className="text-2xl font-serif mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fashion-cream">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-fashion-dark-gray hover:text-fashion-black mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-8">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={post.featured_image_url || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-fashion-dark-gray mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sharePost}
                  className="flex items-center gap-1"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-fashion-dark-gray mb-6">
                  {post.excerpt}
                </p>
              )}

              {/* Categories and Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
                {tags.map((tag) => (
                  <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-fashion-light-gray pt-12">
              <h2 className="text-2xl font-serif font-medium mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.featured_image_url || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif font-medium line-clamp-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-fashion-dark-gray">
                          {formatDate(relatedPost.published_at)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
