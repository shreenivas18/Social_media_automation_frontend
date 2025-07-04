"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { user, userProfile, isLoading: isAuthLoading, refreshProfile } = useAuth();

  // Content DNA state
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");

  // Account state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      // Fetch onboarding data
      const fetchOnboardingData = async () => {
        const { data } = await supabase
          .from("onboarding")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (data) {
          setQ1(data.question1 || "");
          setQ2(data.question2 || "");
          setQ3(data.question3 || "");
          setQ4(data.question4 || "");
          setQ5(data.question5 || "");
        }
      };
      fetchOnboardingData();
    }

    if (userProfile) {
      setName(userProfile.full_name || "");
      setEmail(userProfile.email || "");
    }
  }, [user, userProfile]);

  const handleSaveContentDNA = async () => {
    if (!user) return;
    setIsSavingContent(true);
    setSuccessMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("onboarding")
      .update({
        question1: q1,
        question2: q2,
        question3: q3,
        question4: q4,
        question5: q5,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      setErrorMessage("Failed to save Content DNA. Please try again.");
      console.error("Error saving content DNA:", error);
    } else {
      setSuccessMessage("Content DNA saved successfully!");
    }
    setIsSavingContent(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleUpdateAccount = async () => {
    if (!user) return;
    setIsSavingAccount(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Update profile (name)
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: name, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (profileError) {
      setErrorMessage("Failed to update name. Please try again.");
      console.error("Error updating profile:", profileError);
      setIsSavingAccount(false);
      return;
    }

    // Update auth user (password)
    if (password) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setIsSavingAccount(false);
        return;
      }
      const { error: passwordError } = await supabase.auth.updateUser({ password });
      if (passwordError) {
        setErrorMessage(passwordError.message);
        setIsSavingAccount(false);
        return;
      }
    }
    
    await refreshProfile();

    setSuccessMessage("Account updated successfully!");
    setPassword("");
    setConfirmPassword("");
    setIsSavingAccount(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  
  if (isAuthLoading) {
      return <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-950 text-white"><p>Loading settings...</p></div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-950 text-white p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Profile & Settings</h1>
        {successMessage && <div className="mb-4 p-3 rounded-md bg-green-600 text-white text-center">{successMessage}</div>}
        {errorMessage && <div className="mb-4 p-3 rounded-md bg-red-600 text-white text-center">{errorMessage}</div>}
        <Tabs defaultValue="content-dna" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="content-dna">Content DNA</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="content-dna">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Content DNA</CardTitle>
                <CardDescription className="text-gray-400">
                  Modify your original onboarding answers. This helps us generate content that is perfectly tailored to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-400">
                <div className="space-y-2">
                  <Label htmlFor="product-service">What is your product/service?</Label>
                  <Input id="product-service" value={q1} onChange={(e) => setQ1(e.target.value)} placeholder="e.g., AI-powered medical billing software" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ideal-customers">Who are your ideal customers?</Label>
                  <Input id="ideal-customers" value={q2} onChange={(e) => setQ2(e.target.value)} placeholder="e.g., Independent medical practices" className="bg-gray-800 border-ray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">What is the topic?</Label>
                  <Input id="topic" value={q3} onChange={(e) => setQ3(e.target.value)} placeholder="e.g., SaaS pricing strategies in 2025" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unique-style">What's your unique style?</Label>
                  <Input id="unique-style" value={q4} onChange={(e) => setQ4(e.target.value)} placeholder="e.g., Professional with occasional humor" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-platforms">Where do you want to post?</Label>
                  <Input id="post-platforms" value={q5} onChange={(e) => setQ5(e.target.value)} placeholder="e.g., LinkedIn and Blog" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveContentDNA} disabled={isSavingContent} className="ml-auto bg-blue-600 hover:bg-blue-700">
                  {isSavingContent ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Account Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your name and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-400">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Alex" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} disabled className="bg-gray-800 border-gray-700 text-gray-200 disabled:opacity-50"/>
                   <p className="text-xs text-gray-500">Email address cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-800 border-gray-700 text-gray-200" placeholder="Leave blank to keep current password"/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-800 border-gray-700 text-gray-200" placeholder="Confirm new password"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdateAccount} disabled={isSavingAccount} className="ml-auto bg-blue-600 hover:bg-blue-700">
                  {isSavingAccount ? "Updating..." : "Update Account"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
