import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  PlayCircle,
  CheckCircle2
} from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Button } from '../../components/ui/button';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: 'Alex Rivera',
    enrolledCourses: 4,
    completedCourses: 12,
    learningHours: 156,
    points: 2450
  });

  const activeCourses = [
    {
      id: '1',
      title: 'Advanced System Architecture',
      instructor: 'Dr. Sarah Chen',
      progress: 65,
      lastAccessed: '2 hours ago',
      thumbnail: '/api/placeholder/400/225'
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      instructor: 'Marcus Thorne',
      progress: 32,
      lastAccessed: 'Yesterday',
      thumbnail: '/api/placeholder/400/225'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'quiz', title: 'Network Security Quiz', score: '95%', date: 'May 15' },
    { id: 2, type: 'course', title: 'Cloud Infrastructure', status: 'Completed', date: 'May 14' },
    { id: 3, type: 'assignment', title: 'Database Design', status: 'Submitted', date: 'May 12' }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col space-y-8">
        {/* Welcome Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {userData.name}!</h1>
              <p className="text-slate-500 mt-1">You've completed 85% of your weekly learning goal. Keep it up!</p>
            </div>
            <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-900 font-medium">{userData.points} Learning Points</span>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">In Progress</p>
                  <h3 className="text-2xl font-bold">{userData.enrolledCourses}</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Completed</p>
                  <h3 className="text-2xl font-bold">{userData.completedCourses}</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Learning Hours</p>
                  <h3 className="text-2xl font-bold">{userData.learningHours}h</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Certificates</p>
                  <h3 className="text-2xl font-bold">8</h3>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Active Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <Button variant="ghost" className="text-indigo-600">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-32 object-cover"
                  />
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <p className="text-sm text-slate-500">{course.instructor}</p>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {course.lastAccessed}
                      </span>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        <PlayCircle className="h-4 w-4 mr-2" /> Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  <div className="flex items-center p-4 hover:bg-slate-50 cursor-pointer">
                    <div className="h-10 w-10 rounded bg-red-50 flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Final Project Submission</p>
                      <p className="text-sm text-slate-500">Enterprise Java Architecture</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-red-600">Tomorrow</p>
                      <p className="text-xs text-slate-400">11:59 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 hover:bg-slate-50 cursor-pointer">
                    <div className="h-10 w-10 rounded bg-blue-50 flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Module 4 Quiz</p>
                      <p className="text-sm text-slate-500">Cybersecurity Ethics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">In 3 days</p>
                      <p className="text-xs text-slate-400">May 21</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                        <div className="absolute top-4 bottom-0 left-[3.5px] w-[1px] bg-slate-200" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {activity.type === 'quiz' ? `Scored ${activity.score}` : activity.status} • {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-2 text-sm">
                  View Full History
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">Level Up Your Skills</h3>
                  <p className="text-sm text-slate-400">
                    Based on your profile, we recommend exploring the new "Kubernetes for Enterprises" track.
                  </p>
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-200">
                    Explore Track <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;