"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Video,
  Instagram,
  Youtube,
  Sparkles,
  Wand2,
  Download,
  Upload,
  ImageIcon,
  Mic,
  Type,
  Palette,
  Clock,
  Target,
  Eye,
  Settings,
  CheckCircle,
  Loader2,
  Share2,
  Save,
  RotateCcw,
  Volume2,
  Layers,
  Zap,
  TrendingUp,
  Heart,
} from "lucide-react"
import { Search } from "lucide-react" // Import Search from lucide-react

export default function VideoGeneratorPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram")
  const [selectedTone, setSelectedTone] = useState("professional")
  const [scriptLength, setScriptLength] = useState(30)
  const [generatedScript, setGeneratedScript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)

  const platforms = [
    {
      id: "instagram",
      name: "Instagram Reels",
      icon: Instagram,
      dimensions: "9:16",
      maxDuration: 90,
      description: "Vertical videos for Instagram Reels",
    },
    {
      id: "youtube",
      name: "YouTube Shorts",
      icon: Youtube,
      dimensions: "9:16",
      maxDuration: 60,
      description: "Short-form content for YouTube",
    },
  ]

  const tones = [
    { id: "professional", name: "Professional", description: "Formal and business-focused", color: "blue" },
    { id: "casual", name: "Casual", description: "Relaxed and friendly", color: "green" },
    { id: "educational", name: "Educational", description: "Informative and clear", color: "purple" },
    { id: "humorous", name: "Humorous", description: "Light-hearted and fun", color: "yellow" },
    { id: "inspirational", name: "Inspirational", description: "Motivating and uplifting", color: "pink" },
  ]

  const visualStyles = [
    { id: "minimal", name: "Minimal", preview: "/placeholder.svg?height=200&width=150" },
    { id: "modern", name: "Modern", preview: "/placeholder.svg?height=200&width=150" },
    { id: "bold", name: "Bold", preview: "/placeholder.svg?height=200&width=150" },
    { id: "elegant", name: "Elegant", preview: "/placeholder.svg?height=200&width=150" },
  ]

  const musicTracks = [
    { id: 1, name: "Upbeat Corporate", duration: "2:30", genre: "Corporate" },
    { id: 2, name: "Inspiring Journey", duration: "3:15", genre: "Inspirational" },
    { id: 3, name: "Tech Innovation", duration: "2:45", genre: "Technology" },
    { id: 4, name: "Calm Focus", duration: "4:00", genre: "Ambient" },
  ]

  const recentVideos = [
    {
      id: 1,
      title: "AI Content Creation Tips",
      platform: "Instagram",
      views: 2847,
      engagement: "4.2%",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Marketing Automation Guide",
      platform: "YouTube",
      views: 1523,
      engagement: "3.8%",
      date: "2024-01-12",
    },
    {
      id: 3,
      title: "Social Media Trends 2024",
      platform: "Instagram",
      views: 3921,
      engagement: "5.1%",
      date: "2024-01-10",
    },
  ]

  const generateScript = async () => {
    setIsGenerating(true)

    // Simulate AI script generation
    setTimeout(() => {
      const sampleScript = `[HOOK - 0:00-0:03]
"Stop wasting hours on content creation!"

[PROBLEM - 0:03-0:08]
Most entrepreneurs spend 10+ hours weekly creating content that barely gets seen.

[SOLUTION - 0:08-0:20]
Here's how AI can 10x your content output:
• Generate ideas in seconds
• Write compelling copy automatically
• Optimize for each platform

[PROOF - 0:20-0:25]
Our clients save 8 hours per week and see 300% more engagement.

[CTA - 0:25-0:30]
Ready to transform your content? Link in bio! 👆`

      setGeneratedScript(sampleScript)
      setIsGenerating(false)
    }, 2000)
  }

  const generateVideo = () => {
    setIsGeneratingVideo(true)
    setVideoProgress(0)

    // Simulate video generation progress
    const interval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGeneratingVideo(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold flex items-center">
                <Video className="w-6 h-6 mr-3 text-purple-500" />
                Video Script Generator
              </h1>
              <Badge variant="outline" className="text-green-400 border-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                AI Ready
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Assets
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
              <CardTitle className="text-sm font-medium text-gray-400">Videos Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +6 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45.2K</div>
              <p className="text-xs text-blue-400 flex items-center mt-1">
                <Eye className="w-3 h-3 mr-1" />
                +18% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg. Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4.7%</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <Heart className="w-3 h-3 mr-1" />
                Above average
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Best Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-white">AI Content Tips</div>
              <p className="text-xs text-gray-400 mt-1">3.9K views</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Creation Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Platform Selection
                </CardTitle>
                <CardDescription>Choose your target platform for optimized content format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlatform === platform.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setSelectedPlatform(platform.id)}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <platform.icon
                          className={`w-6 h-6 ${platform.id === "instagram" ? "text-pink-500" : "text-red-500"}`}
                        />
                        <div>
                          <h3 className="font-medium text-white">{platform.name}</h3>
                          <p className="text-sm text-gray-400">{platform.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Aspect Ratio: {platform.dimensions}</span>
                        <span className="text-gray-400">Max: {platform.maxDuration}s</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tone & Style Selection */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-500" />
                  Tone & Style
                </CardTitle>
                <CardDescription>Select the tone and visual style for your video content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tone Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Content Tone</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tones.map((tone) => (
                      <div
                        key={tone.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedTone === tone.id
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedTone(tone.id)}
                      >
                        <h4 className="font-medium text-white mb-1">{tone.name}</h4>
                        <p className="text-xs text-gray-400">{tone.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Visual Style</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {visualStyles.map((style) => (
                      <div key={style.id} className="cursor-pointer group">
                        <div className="aspect-[9/16] bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors overflow-hidden mb-2">
                          <img
                            src={style.preview || "/placeholder.svg"}
                            alt={style.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-center text-white">{style.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Script Generation */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                  AI Script Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Topic Input */}
                <div className="space-y-2">
                  <Label htmlFor="video-topic">Video Topic/Goal</Label>
                  <Textarea
                    id="video-topic"
                    placeholder="e.g., Explain how AI can help small businesses save time on content creation, promote our new course, address customer pain points about social media marketing..."
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                {/* Length Selector */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Video Length</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[scriptLength]}
                      onValueChange={(value) => setScriptLength(value[0])}
                      max={platforms.find((p) => p.id === selectedPlatform)?.maxDuration || 60}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>10s</span>
                      <span className="text-white font-medium">{scriptLength}s</span>
                      <span>{platforms.find((p) => p.id === selectedPlatform)?.maxDuration}s</span>
                    </div>
                  </div>
                </div>

                {/* Brand Voice Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label className="text-sm">Apply my Content DNA voice profile</Label>
                </div>

                <Button
                  onClick={generateScript}
                  disabled={isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Script...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Script
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Script Editor */}
            {generatedScript && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Type className="w-5 h-5 mr-2" />
                      Script Editor
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                        <Zap className="w-4 h-4 mr-2" />
                        Optimize
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={generatedScript}
                    onChange={(e) => setGeneratedScript(e.target.value)}
                    className="min-h-[300px] bg-gray-800 border-gray-700 font-mono text-sm"
                  />

                  {/* Script Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">✓</div>
                      <p className="text-xs text-gray-400">Hook Strength</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{scriptLength}s</div>
                      <p className="text-xs text-gray-400">Estimated Length</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">A+</div>
                      <p className="text-xs text-gray-400">SEO Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video Generation */}
            {generatedScript && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="w-5 h-5 mr-2 text-red-500" />
                    Video Generation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Audio Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Background Music</Label>
                      <Select defaultValue="1">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {musicTracks.map((track) => (
                            <SelectItem key={track.id} value={track.id.toString()}>
                              <div className="flex items-center justify-between w-full">
                                <span>{track.name}</span>
                                <span className="text-xs text-gray-400 ml-2">{track.genre}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Voice Selection</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional Male</SelectItem>
                          <SelectItem value="friendly">Friendly Female</SelectItem>
                          <SelectItem value="energetic">Energetic Male</SelectItem>
                          <SelectItem value="calm">Calm Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Volume Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Music Volume
                      </Label>
                      <Slider defaultValue={[30]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <Mic className="w-4 h-4 mr-2" />
                        Voice Volume
                      </Label>
                      <Slider defaultValue={[80]} max={100} step={1} />
                    </div>
                  </div>

                  {/* Generation Progress */}
                  {isGeneratingVideo && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Generating Video...</Label>
                        <span className="text-sm text-gray-400">{videoProgress}%</span>
                      </div>
                      <Progress value={videoProgress} className="w-full" />
                    </div>
                  )}

                  {/* Generation Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" className="border-gray-700 bg-transparent">
                        <Save className="w-4 h-4 mr-2" />
                        Save Project
                      </Button>
                      <Button variant="outline" className="border-gray-700 bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                    <Button
                      onClick={generateVideo}
                      disabled={isGeneratingVideo}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isGeneratingVideo ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Generate Video
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Download Options */}
                  {videoProgress === 100 && (
                    <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Video Generated Successfully!</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-400 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download MP4
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Asset Library */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="w-5 h-5 mr-2" />
                  Asset Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-gray-600 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">Upload brand assets</p>
                  <p className="text-xs text-gray-500 mt-1">Logo, images, videos</p>
                </div>

                {/* Brand Assets */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Brand Assets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Stock Footage */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Stock Footage</Label>
                  <Button variant="outline" size="sm" className="w-full border-gray-700 bg-transparent">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Stock Library
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Videos */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentVideos.map((video) => (
                    <div key={video.id} className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center">
                          <Video className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white line-clamp-2">{video.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {video.platform}
                            </Badge>
                            <span className="text-xs text-gray-400">{video.views} views</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{video.date}</span>
                            <span className="text-xs text-green-400">{video.engagement}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Hook viewers in the first 3 seconds</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Use captions for 85% of viewers who watch without sound</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Include a clear call-to-action at the end</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Post when your audience is most active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
