"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ResearchGather from '@/components/Research/research-gather'

import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Globe,
  Edit3,
  Eye,
  Save,
  Calendar,
  Send,
  Plus,
  Filter,
  Palette,
  Monitor,
  Smartphone,
  BarChart3,
  TrendingUp,
  Users,
  Settings,
  ExternalLink,
} from "lucide-react"

interface BlogPost {
  id: number;
  title: string;
  status: "published" | "draft" | "scheduled";
  views: number;
  date: string;
}

export default function BlogGeneratorPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [editorMode, setEditorMode] = useState("edit") // 'edit' or 'preview'
  const [mobilePreview, setMobilePreview] = useState(false)





  const blogPosts: BlogPost[] = [
    { id: 1, title: "Getting Started with AI Content", status: "published", views: 1250, date: "2024-01-15" },
    { id: 2, title: "The Future of Social Media Marketing", status: "draft", views: 0, date: "2024-01-10" },
    { id: 3, title: "Building Your Personal Brand", status: "scheduled", views: 0, date: "2024-01-20" },
  ]

  const templates = [
    { id: 1, name: "Minimal", preview: "/placeholder.svg?height=200&width=300", category: "Clean" },
    { id: 2, name: "Professional", preview: "/placeholder.svg?height=200&width=300", category: "Business" },
    { id: 3, name: "Creative", preview: "/placeholder.svg?height=200&width=300", category: "Design" },
    { id: 4, name: "Tech Blog", preview: "/placeholder.svg?height=200&width=300", category: "Technology" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Research input */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <ResearchGather />


      </div>
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Blog Dashboard</h1>
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Globe className="w-3 h-3 mr-1" />
                yourname.aicontentteam.com
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Edit Subdomain
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Live Site
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8,547</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg. Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4.2%</div>
              <p className="text-xs text-blue-400 flex items-center mt-1">
                <Users className="w-3 h-3 mr-1" />
                Above average
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Top Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-white">AI Content Guide</div>
              <p className="text-xs text-gray-400 mt-1">2,341 views</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Post Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Posts</CardTitle>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Drafts</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedPost?.id === post.id
                          ? "bg-blue-600/20 border-l-4 border-blue-600"
                          : "hover:bg-gray-800/50"
                      }`}
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-white line-clamp-2">{post.title}</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge
                              variant={post.status === "published" ? "default" : "secondary"}
                              className={`text-xs ${
                                post.status === "published"
                                  ? "bg-green-600"
                                  : post.status === "scheduled"
                                    ? "bg-yellow-600"
                                    : "bg-gray-600"
                              }`}
                            >
                              {post.status}
                            </Badge>
                            {post.views > 0 && <span className="text-xs text-gray-400">{post.views} views</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="editor" className="space-y-6">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="editor" className="data-[state=active]:bg-gray-800">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-800">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-800">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Editor Tab */}
              <TabsContent value="editor" className="space-y-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Live Editor</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="preview-mode" className="text-sm">
                            Preview
                          </Label>
                          <Switch
                            id="preview-mode"
                            checked={editorMode === "preview"}
                            onCheckedChange={(checked) => setEditorMode(checked ? "preview" : "edit")}
                          />
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={mobilePreview ? "outline" : "default"}
                            size="sm"
                            onClick={() => setMobilePreview(false)}
                          >
                            <Monitor className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={mobilePreview ? "default" : "outline"}
                            size="sm"
                            onClick={() => setMobilePreview(true)}
                          >
                            <Smartphone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Post Title */}
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Post Title</Label>
                      <Input
                        id="post-title"
                        placeholder="Enter your blog post title..."
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue={selectedPost?.title || ""}
                      />
                    </div>

                    {/* Template Selection */}
                    <div className="space-y-2">
                      <Label>Choose Template</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {templates.map((template) => (
                          <div key={template.id} className="relative cursor-pointer group">
                            <div className="aspect-video bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors overflow-hidden">
                              <img
                                src={template.preview || "/placeholder.svg"}
                                alt={template.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mt-2 text-center">
                              <p className="text-sm font-medium text-white">{template.name}</p>
                              <p className="text-xs text-gray-400">{template.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      {editorMode === "edit" ? (
                        <div className="space-y-3">
                          {/* Formatting Toolbar */}
                          <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
                            <Button variant="ghost" size="sm">
                              <strong>B</strong>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <em>I</em>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <u>U</u>
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <Button variant="ghost" size="sm">
                              H1
                            </Button>
                            <Button variant="ghost" size="sm">
                              H2
                            </Button>
                            <Button variant="ghost" size="sm">
                              H3
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <Button variant="ghost" size="sm">
                              Link
                            </Button>
                            <Button variant="ghost" size="sm">
                              Image
                            </Button>
                            <Button variant="ghost" size="sm">
                              List
                            </Button>
                          </div>
                          <Textarea
                            id="post-content"
                            placeholder="Start writing your blog post..."
                            className="min-h-[400px] bg-gray-800 border-gray-700 text-white resize-none"
                            defaultValue="# Welcome to AI Content Creation

This is where you can write your amazing blog post content. The editor supports markdown formatting and real-time preview.

## Key Features

- **Rich text editing** with formatting toolbar
- **Live preview** to see how your post will look
- **Template selection** for quick styling
- **Mobile responsive** preview
- **SEO optimization** tools

Start writing and watch your content come to life!"
                          />
                        </div>
                      ) : (
                        <div
                          className={`min-h-[400px] p-6 bg-white text-gray-900 rounded-lg ${mobilePreview ? "max-w-sm mx-auto" : ""}`}
                        >
                          <div className="prose prose-lg max-w-none">
                            <h1>Welcome to AI Content Creation</h1>
                            <p>
                              This is where you can write your amazing blog post content. The editor supports markdown
                              formatting and real-time preview.
                            </p>
                            <h2>Key Features</h2>
                            <ul>
                              <li>
                                <strong>Rich text editing</strong> with formatting toolbar
                              </li>
                              <li>
                                <strong>Live preview</strong> to see how your post will look
                              </li>
                              <li>
                                <strong>Template selection</strong> for quick styling
                              </li>
                              <li>
                                <strong>Mobile responsive</strong> preview
                              </li>
                              <li>
                                <strong>SEO optimization</strong> tools
                              </li>
                            </ul>
                            <p>Start writing and watch your content come to life!</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Publishing Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" className="border-gray-700 bg-transparent">
                          <Save className="w-4 h-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button variant="outline" className="border-gray-700 bg-transparent">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Send className="w-4 h-4 mr-2" />
                        Publish Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Theme Controls */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Palette className="w-5 h-5 mr-2" />
                        Theme Customization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Color Pickers */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Primary Color</Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg border border-gray-700"></div>
                            <Input
                              type="color"
                              defaultValue="#2563eb"
                              className="w-20 h-10 bg-gray-800 border-gray-700"
                            />
                            <span className="text-sm text-gray-400">#2563eb</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Secondary Color</Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="w-10 h-10 bg-gray-600 rounded-lg border border-gray-700"></div>
                            <Input
                              type="color"
                              defaultValue="#4b5563"
                              className="w-20 h-10 bg-gray-800 border-gray-700"
                            />
                            <span className="text-sm text-gray-400">#4b5563</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Accent Color</Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="w-10 h-10 bg-green-600 rounded-lg border border-gray-700"></div>
                            <Input
                              type="color"
                              defaultValue="#059669"
                              className="w-20 h-10 bg-gray-800 border-gray-700"
                            />
                            <span className="text-sm text-gray-400">#059669</span>
                          </div>
                        </div>
                      </div>

                      {/* Font Selection */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Heading Font</Label>
                          <Select defaultValue="inter">
                            <SelectTrigger className="mt-2 bg-gray-800 border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inter">Inter</SelectItem>
                              <SelectItem value="roboto">Roboto</SelectItem>
                              <SelectItem value="opensans">Open Sans</SelectItem>
                              <SelectItem value="lato">Lato</SelectItem>
                              <SelectItem value="montserrat">Montserrat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Body Font</Label>
                          <Select defaultValue="system">
                            <SelectTrigger className="mt-2 bg-gray-800 border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="system">System UI</SelectItem>
                              <SelectItem value="inter">Inter</SelectItem>
                              <SelectItem value="roboto">Roboto</SelectItem>
                              <SelectItem value="opensans">Open Sans</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Layout Options */}
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">Layout Options</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-blue-500">
                            <div className="aspect-video bg-gray-700 rounded mb-2"></div>
                            <p className="text-xs text-center">Wide Layout</p>
                          </div>
                          <div className="p-3 bg-gray-800 rounded-lg border border-blue-500 cursor-pointer">
                            <div className="aspect-video bg-gray-700 rounded mb-2 mx-2"></div>
                            <p className="text-xs text-center">Centered</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Preview */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Eye className="w-5 h-5 mr-2" />
                          Live Preview
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={mobilePreview ? "outline" : "default"}
                            size="sm"
                            onClick={() => setMobilePreview(false)}
                          >
                            <Monitor className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={mobilePreview ? "default" : "outline"}
                            size="sm"
                            onClick={() => setMobilePreview(true)}
                          >
                            <Smartphone className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`bg-white rounded-lg overflow-hidden ${mobilePreview ? "max-w-sm mx-auto" : ""}`}>
                        <div className="h-64 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                          <div className="text-center text-white">
                            <h1 className="text-2xl font-bold mb-2">Your Blog</h1>
                            <p className="text-blue-100">Live preview of your customizations</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <h2 className="text-xl font-bold text-gray-900 mb-3">Sample Blog Post</h2>
                          <p className="text-gray-600 mb-4">
                            This is how your blog posts will look with the current theme settings.
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Jan 15, 2024</span>
                            <span>•</span>
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Analytics chart will be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle>Top Performing Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {blogPosts.map((post, index) => (
                          <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium text-white">{post.title}</p>
                              <p className="text-sm text-gray-400">{post.views} views</p>
                            </div>
                            <Badge variant="outline">#{index + 1}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
