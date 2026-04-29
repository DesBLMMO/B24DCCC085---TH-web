import { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  TagsOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useBlogStore } from "./store";
import { Post } from "./types";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AboutPage from "./pages/AboutPage";
import ManagePostsPage from "./pages/ManagePostsPage";
import ManageTagsPage from "./pages/ManageTagsPage";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

// Các trang trong app
type Page = "home" | "detail" | "about" | "manage-posts" | "manage-tags";

export default function TH07App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Lấy dữ liệu và các hàm từ store
  const store = useBlogStore();

  // Chuyển sang trang chi tiết
  function goToDetail(post: Post) {
    setSelectedPost(post);
    setCurrentPage("detail");
  }

  // Quay lại trang chủ
  function goHome() {
    setSelectedPost(null);
    setCurrentPage("home");
  }

  // Render trang hiện tại
  function renderPage() {
    if (currentPage === "detail" && selectedPost) {
      return (
        <DetailPage
          post={selectedPost}
          posts={store.posts}
          tags={store.tags}
          onBack={goHome}
          onReadPost={goToDetail}
          increaseView={store.increaseView}
        />
      );
    }
    if (currentPage === "about") {
      return <AboutPage />;
    }
    if (currentPage === "manage-posts") {
      return (
        <ManagePostsPage
          posts={store.posts}
          tags={store.tags}
          addPost={store.addPost}
          updatePost={store.updatePost}
          deletePost={store.deletePost}
        />
      );
    }
    if (currentPage === "manage-tags") {
      return (
        <ManageTagsPage
          tags={store.tags}
          posts={store.posts}
          addTag={store.addTag}
          updateTag={store.updateTag}
          deleteTag={store.deleteTag}
        />
      );
    }
    // Mặc định: trang chủ
    return (
      <HomePage
        posts={store.posts}
        tags={store.tags}
        onReadPost={goToDetail}
      />
    );
  }

  // Menu items
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Bài viết",
    },
    {
      key: "about",
      icon: <InfoCircleOutlined />,
      label: "Giới thiệu",
    },
    {
      key: "manage-posts",
      icon: <FileTextOutlined />,
      label: "Quản lý bài viết",
    },
    {
      key: "manage-tags",
      icon: <TagsOutlined />,
      label: "Quản lý thẻ",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            minWidth: 160,
          }}
          onClick={goHome}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1677ff, #0958d9)",
              borderRadius: 8,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeOutlined style={{ color: "#fff", fontSize: 18 }} />
          </div>
          <Text
            strong
            style={{
              fontSize: 16,
              color: "#1a1a2e",
              letterSpacing: 0.5,
            }}
          >
            DSA Blog
          </Text>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[currentPage === "detail" ? "home" : currentPage]}
          items={menuItems}
          style={{
            flex: 1,
            border: "none",
            minWidth: 0,
          }}
          onClick={({ key }) => {
            setCurrentPage(key as Page);
            setSelectedPost(null);
          }}
        />
      </Header>

      <Content style={{ background: "#f5f5f5", minHeight: "calc(100vh - 120px)" }}>
        {renderPage()}
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "#1a1a2e",
          color: "#adb5bd",
          padding: "16px 24px",
        }}
      >
        <Text style={{ color: "#adb5bd" }}>
          Blog — Nguyễn Minh · Cấu trúc Dữ liệu & Giải thuật 
        </Text>
      </Footer>
    </Layout>
  );
}