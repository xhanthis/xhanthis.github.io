import Link from "next/link"
import Image from "next/image"
import MediumArticles from "@/components/medium-articles"
import Slider from "@/components/slider"

export default function Home() {
  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-xl mx-auto py-16">
        {/* Avatar and Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Image 
              src="/avatar.jpeg" 
              alt="Rahul Kulkarni" 
              width={120} 
              height={120} 
              className="rounded-full mx-auto border-4 border-[#30363d]"
              suppressHydrationWarning
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Rahul</h1>
          
          <div className="space-y-4 text-gray-400 leading-relaxed max-w-lg mx-auto">
            <p>I love solving problems and building things.</p>

            <p>
              I am a Senior Product Manager at {" "}
              <Link href="https://www.saffronstays.com" className="text-white hover:underline decoration-blue-400 underline-offset-4">
                SaffronStays 
              </Link>{" "}
              where I scale everything product and tech from 1-10x, profitably.
            </p>

            <p>I am happiest when designing and coding.</p>

            <p>EDIT: Second happiest. Happiest when spending time with my girlfriend, of course.</p>


            <div className="flex justify-center gap-6 text-sm text-gray-500 mt-6">
              <Link href="https://www.linkedin.com/in/merahulkulkarni" className="hover:text-white transition-colors">
                LinkedIn
              </Link>
              <Link href="https://twitter.com/xhanthis" className="hover:text-white transition-colors">
                Twitter (X)
              </Link>
              <Link href="https://calendar.app.google/MTFKVZnChMqd8wiv7" className="hover:text-white transition-colors">
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
        {/* <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 tracking-tight text-white">Some things I believe</h2>
          
          <div className="space-y-3 text-gray-400">
            <p>• Doing the boring work is a superpower.</p>
            <p>• People who love their craft likely work on weekends.</p>
            <p>• Most of our success depends on luck.</p>
          </div>
        </div> */}

        {/* What I'm Building Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 tracking-tight text-white">Currently building</h2>
          
          <div className="space-y-4">
            <Link
              href="https://www.saffronstays.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[#0d1117] border border-gray-800 rounded-xl hover:border-gray-600 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 relative bg-white rounded flex items-center justify-center overflow-hidden">
                  <Image src="/saffronstays-logo.jpg" alt="SaffronStays App" width={24} height={24} className="object-cover" suppressHydrationWarning />
                </div>
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">SaffronStays App</h3>
              </div>
              <p className="text-gray-400 text-sm">
                SaffronStays, now mobile — 10× better experiences, everywhere.
              </p>
            </Link>

            <Link
              href="https://hiredm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[#0d1117] border border-gray-800 rounded-xl hover:border-gray-600 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 relative bg-white rounded flex items-center justify-center p-0.5">
                  <Image src="/hiredm-logo.png" alt="HireDM" width={24} height={24} className="rounded" suppressHydrationWarning />
                </div>
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">HireDM</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Hiring simplified for Founders & Startups.
              </p>
            </Link>
          </div>
        </div>

        {/* Writings Section */}
        <div>
          <h2 className="text-xl font-bold mb-6 tracking-tight text-white">Stuff I wrote</h2>
          <MediumArticles showLatest={3} />
          <div className="mt-6">
            <Link
              href="https://medium.com/@xhanthis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Read more on Medium →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
