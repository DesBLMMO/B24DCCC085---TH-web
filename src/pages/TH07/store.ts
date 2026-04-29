import { useState, useEffect } from "react";
import { Post, Tag } from "./types";
import { defaultPosts, defaultTags } from "./data";


function loadPosts(): Post[] {
  const saved = localStorage.getItem("blog_posts");
  if (saved) return JSON.parse(saved);
  return defaultPosts;
}

function loadTags(): Tag[] {
  const saved = localStorage.getItem("blog_tags");
  if (saved) return JSON.parse(saved);
  return defaultTags;
}

// Lưu vào localStorage
function savePosts(posts: Post[]) {
  localStorage.setItem("blog_posts", JSON.stringify(posts));
}

function saveTags(tags: Tag[]) {
  localStorage.setItem("blog_tags", JSON.stringify(tags));
}


export function useBlogStore() {
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [tags, setTags] = useState<Tag[]>(loadTags);


  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  useEffect(() => {
    saveTags(tags);
  }, [tags]);


  function addPost(post: Post) {
    setPosts((prev) => [post, ...prev]);
  }

  function updatePost(updated: Post) {
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function increaseView(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p))
    );
  }



  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(updated: Tag) {
    setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function deleteTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  return {
    posts,
    tags,
    addPost,
    updatePost,
    deletePost,
    increaseView,
    addTag,
    updateTag,
    deleteTag,
  };
}