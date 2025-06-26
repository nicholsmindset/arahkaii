
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
}

const BlogWidget: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentPosts(data || []);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (recentPosts.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-serif">Latest from our Journal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block group hover:bg-fashion-light-gray p-2 rounded transition-colors"
          >
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-fashion-accent transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-1 text-xs text-fashion-dark-gray mt-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.published_at)}
            </div>
          </Link>
        ))}
        <Link
          to="/blog"
          className="flex items-center gap-1 text-sm font-medium text-fashion-accent hover:text-fashion-black transition-colors"
        >
          View all articles <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogWidget;
