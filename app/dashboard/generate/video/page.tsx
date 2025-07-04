"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lightbulb, Sparkles, Wand2, Type, Loader2 } from "lucide-react"

export default function VideoGeneratorPage() {
  const [videoType, setVideoType] = useState<'educational' | 'inspirational' | null>(null);
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResearching, setIsResearching] = useState(false);

  const handleGenerateScript = async () => {
    if (!videoType || !topic) return;

    // Step 1: Kick off the research
    setIsResearching(true);
    try {
      const response = await fetch('/api/scraper/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to start research');
      }

      const data = await response.json();
      console.log('Scraper response:', data);

    } catch (error) {
      console.error(error);
      setIsResearching(false); // Stop on error
      return;
    }
    setIsResearching(false);

    // Step 2: Generate the script (using existing mock logic for now)
    setIsGenerating(true);
    setScript(''); // Clear previous script

    // Simulate API call to generate script
    await new Promise(resolve => setTimeout(resolve, 2000));

    let generatedScript = '';
    if (videoType === 'educational') {
      generatedScript = `Title: An Educational Video on ${topic}\n\nHook: Ever wondered about ${topic}? We're breaking it down for you in the next 60 seconds.\n\nPoint 1: The first key aspect of ${topic} is...\n\nPoint 2: Another crucial point to understand is...\n\nPoint 3: Finally, this is how ${topic} impacts our world...\n\nCall to Action: What did you find most interesting about ${topic}? Comment below!`;
    } else if (videoType === 'inspirational') {
      generatedScript = `Title: How ${topic} Can Inspire You\n\nHook: Feeling stuck? Let's explore how the journey of ${topic} can ignite a fire within you.\n\nScene 1: Introduction to the challenge related to ${topic}.\n\nScene 2: The turning point and the struggle for progress.\n\nScene 3: The breakthrough moment and the lesson learned.\n\nConclusion: You have the power to overcome, just like in the story of ${topic}. Go make your mark.`;
    }

    setScript(generatedScript);
    setIsGenerating(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-950 text-white p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Generate Your Next Viral Video</h1>
        <p className="text-center text-gray-400 mb-8">Start by selecting a video style, and we'll craft a script for you.</p>

        <div className="space-y-8">
          {/* Step 1: Select Video Type */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>1. Choose Your Video Style</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setVideoType('educational')}
                className={`p-6 rounded-lg border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
                  videoType === 'educational'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Lightbulb className="w-10 h-10 text-blue-400" />
                <span className="text-xl font-semibold">Educational</span>
                <p className="text-sm text-gray-400 text-center">Inform and teach your audience about a specific topic.</p>
              </button>
              <button
                onClick={() => setVideoType('inspirational')}
                className={`p-6 rounded-lg border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
                  videoType === 'inspirational'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Sparkles className="w-10 h-10 text-purple-400" />
                <span className="text-xl font-semibold">Inspirational</span>
                <p className="text-sm text-gray-400 text-center">Motivate and uplift your viewers with a powerful message.</p>
              </button>
            </CardContent>
          </Card>

          {/* Step 2: Enter Topic */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>2. What is your video about?</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'The future of renewable energy'"
                className="bg-gray-800 border-gray-700 text-base"
              />
            </CardContent>
          </Card>

          {/* Step 3: Generate Script */}
          <div className="text-center">
             <Button
                onClick={handleGenerateScript}
                disabled={!videoType || !topic || isGenerating || isResearching}
                size="lg"
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {isResearching || isGenerating ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="w-5 h-5 mr-2" />
                )}
                {isResearching ? 'Researching...' : isGenerating ? 'Generating...' : 'Generate Script'}
              </Button>
          </div>

          {/* Step 4: Edit Script */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>3. Your Video Script</span>
                <Button variant="outline" size="sm" className="bg-transparent border-gray-700">
                    <Type className="w-4 h-4 mr-2" />
                    Edit Script
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Your generated script will appear here. You can edit it directly."
                className="min-h-[300px] bg-gray-800 border-gray-700 text-base"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
