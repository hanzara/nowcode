
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileType, setProfileType] = useState<'borrower' | 'investor' | 'lender' | ''>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting to sign in with:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('Sign in response:', { data, error });
        
        if (error) {
          console.error('Sign in error:', error);
          throw error;
        }
        
        console.log('Sign in successful:', data);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        // Validate required fields for sign up
        if (!profileType) {
          toast({
            title: "Error",
            description: "Please select your role (Borrower, Investor, or Lender)",
            variant: "destructive",
          });
          return;
        }

        if (!displayName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your display name",
            variant: "destructive",
          });
          return;
        }

        console.log('Attempting to sign up with:', email, 'Role:', profileType);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined,
            data: {
              display_name: displayName,
              profile_type: profileType
            }
          }
        });
        
        console.log('Sign up response:', { data, error });
        
        if (error) {
          console.error('Sign up error:', error);
          throw error;
        }
        
        // Check if user was created successfully
        if (data.user) {
          // Create user profile after successful signup
          try {
            const { error: profileError } = await supabase
              .from('user_profiles')
              .insert({
                user_id: data.user.id,
                display_name: displayName,
                profile_type: profileType
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
              // Don't throw here, as the user was created successfully
            }
          } catch (profileErr) {
            console.error('Profile creation failed:', profileErr);
          }

          if (data.session) {
            // User is immediately signed in (email confirmation disabled)
            toast({
              title: "Account created successfully!",
              description: `Welcome to LendChain as a ${profileType}. You can now start using the platform.`,
            });
          } else {
            // Email confirmation is required
            toast({
              title: "Account created!",
              description: "Your account has been created. You can now sign in with your credentials.",
            });
            // Automatically switch to sign in mode
            setIsLogin(true);
          }
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      let errorMessage = error.message;
      
      // Provide more helpful error messages
      if (error.message === 'Invalid login credentials') {
        errorMessage = "The email or password you entered is incorrect. Please check your credentials and try again.";
      } else if (error.message === 'Email not confirmed') {
        errorMessage = "Your account exists but email confirmation is required. Please check your email or contact support.";
      } else if (error.message === 'User not found') {
        errorMessage = "No account found with this email address. Please sign up first.";
      } else if (error.message.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Please sign in instead.";
        setIsLogin(true);
      } else if (error.message.includes('Password should be')) {
        errorMessage = "Password must be at least 6 characters long.";
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent!",
        description: "Check your email for a password reset link.",
      });
      setIsForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm"
              >
                Back to login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">LendChain</CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    required={!isLogin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profileType">I want to sign up as</Label>
                  <Select onValueChange={(value) => setProfileType(value as 'borrower' | 'investor' | 'lender')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrower">Borrower - I need funding</SelectItem>
                      <SelectItem value="investor">Investor - I want to fund loans</SelectItem>
                      <SelectItem value="lender">Lender - I provide loans directly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              {!isLogin && (
                <p className="text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          {isLogin && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsForgotPassword(true)}
                className="text-sm text-blue-600"
              >
                Forgot your password?
              </Button>
            </div>
          )}
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>

          {!isLogin && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Choose your role to access the right features for your needs. You can apply for loans as a Borrower, or fund and manage loans as an Investor or Lender.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
