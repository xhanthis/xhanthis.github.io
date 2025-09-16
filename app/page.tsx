import Link from "next/link"
import Image from "next/image"
import MediumArticles from "@/components/medium-articles"
import Slider from "@/components/slider"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-xl mx-auto px-6 py-16">
        {/* Avatar and Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Image 
              src="/avatar.jpeg" 
              alt="Rahul Kulkarni" 
              width={120} 
              height={120} 
              className="rounded-full mx-auto border-4 border-gray-100"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Rahul</h1>
          
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-lg mx-auto">
            <p>I love solving problems and building things.</p>

            <p>
              I am a Senior Product Manager at {" "}
              <Link href="https://www.saffronstays.com" className="text-gray-900 hover:underline">
                SaffronStays 
              </Link>{" "}
              where I scale everything product and tech from 1-10x, profitably.
            </p>

            <p>I am happiest when designing and coding.</p>

            <p>EDIT: Second happiest. Happiest when spending time with my girlfriend, of course.</p>


            <div className="flex justify-center gap-6 text-sm text-gray-600 mt-6">
              <Link href="https://www.linkedin.com/in/merahulkulkarni" className="hover:text-gray-900">
                LinkedIn
              </Link>
              <Link href="https://twitter.com/xhanthis" className="hover:text-gray-900">
                Twitter (X)
              </Link>
              <Link href="https://calendar.app.google/MTFKVZnChMqd8wiv7" className="hover:text-gray-900">
                Schedule a call
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="mb-16">
          <Slider />
        </div>

        {/* Some Things I Believe In Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 tracking-tight">Some things I believe</h2>
          
          <div className="space-y-3 text-gray-700">
            <p>• Doing the boring work is a superpower.</p>
            <p>• People who love their craft likely work on weekends.</p>
            <p>• Most of our success depends on luck.</p>
          </div>
        </div>

        {/* What I'm Building Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 tracking-tight">Currently building</h2>
          
          <div className="space-y-4">
            <Link
              href="https://hiredm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 relative">
                  <Image src="/hiredm-logo.png" alt="HireDM" width={24} height={24} className="rounded" />
                </div>
                <h3 className="font-semibold group-hover:text-blue-600 transition-colors">HireDM</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Hiring simplified with DMs
              </p>
            </Link>
          </div>
        </div>

        {/* Writings Section */}
        <div>
          <h2 className="text-xl font-bold mb-6 tracking-tight">Stuff I wrote</h2>
          <MediumArticles showLatest={3} />
          <div className="mt-6">
            <Link
              href="https://medium.com/@xhanthis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Read more on Medium →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
