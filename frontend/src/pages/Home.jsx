import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ClockIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Comprehensive Course Management',
    description: 'Create, organize, and deliver courses with rich multimedia content including videos, PDFs, and interactive materials.',
    icon: BookOpenIcon,
  },
  {
    name: 'Interactive Learning',
    description: 'Engage students with quizzes, assignments, and real-time feedback to enhance the learning experience.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Progress Tracking',
    description: 'Monitor student progress, completion rates, and performance analytics to optimize learning outcomes.',
    icon: ChartBarIcon,
  },
  {
    name: 'Flexible Scheduling',
    description: 'Learn at your own pace with self-paced courses and flexible scheduling options.',
    icon: ClockIcon,
  },
  {
    name: 'Global Access',
    description: 'Access your courses from anywhere in the world with our cloud-based platform.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Community Learning',
    description: 'Connect with instructors and fellow students through discussion forums and collaborative features.',
    icon: UserGroupIcon,
  },
]

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-600 to-secondary-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your Learning Experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A comprehensive Learning Management System designed for modern education. 
              Create, manage, and deliver engaging courses with powerful tools and analytics.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isAuthenticated() ? (
                <Link
                  to="/dashboard"
                  className="btn-primary btn-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary btn-lg"
                  >
                    Get started
                  </Link>
                  <Link
                    to="/courses"
                    className="btn-outline btn-lg"
                  >
                    Browse Courses
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-600 to-secondary-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for modern education
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides comprehensive tools for instructors and students alike, 
            making learning more engaging and effective than ever before.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Join thousands of educators and students who are already using our platform 
              to transform their learning experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isAuthenticated() ? (
                <Link
                  to="/courses"
                  className="btn-lg bg-white text-primary-600 hover:bg-gray-100"
                >
                  Browse Courses
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-lg bg-white text-primary-600 hover:bg-gray-100"
                  >
                    Get started
                  </Link>
                  <Link
                    to="/login"
                    className="btn-lg border-white text-white hover:bg-primary-500"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 