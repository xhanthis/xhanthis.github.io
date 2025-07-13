import Link from "next/link"
import Image from "next/image"
import MediumArticles from "@/components/medium-articles"
import GitHubContributions from "@/components/github-contributions"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium mb-2">Rahul Kulkarni</h1>
          <p className="text-gray-400 mb-6">@xhanthis</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>I love solving problems and building things.</p>

            {/* 
            <p>
              I'm building{" "}
              <Link href="https://www.hiredm.com" className="text-blue-400 hover:underline">
                HireDM ↗
              </Link>
              , revolutizing how hiring works with AI.
            </p> 
            */}

            <p>
              I am a Senior Product Manager at{" "}
              <Link href="https://www.saffronstays.com" className="text-blue-400 hover:underline">
                SaffronStays ↗
              </Link>
              , where I scale everything product and tech from 1-10x, profitably.
            </p>

            {/* /*<p>I like to read and watch movies. I also write sometimes. On weekends I advise startups on tech.</p>
             */}
            <p>
              Book a call with me{" "}
              <Link href="https://www.calendly.com/xhanthis/meet" className="text-blue-400 hover:underline">
                here ↗
              </Link>
              , connect on{" "}
              <Link href="https://www.linkedin.com/in/merahulkulkarni" className="text-blue-400 hover:underline">
                LinkedIn ↗
              </Link>
              , or DM me on{" "}
              <Link href="https://www.hiredm.co/@xhanthis" className="text-blue-400 hover:underline">
                HireDM ↗
              </Link>
            </p>
          </div>
        </div>

        {/* GitHub Activity Section */}
        <GitHubContributions />

        {/* Creations Section */}
        <div className="mb-12">
          <h2 className="text-lg font-medium mb-6">What I'm Building 👷</h2>

          <div className="border-l border-gray-700 pl-6">
            <Link
              href="https://hiredm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-2 hover:bg-gray-900/30 -ml-6 pl-6 py-2 rounded transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 relative">
                  <Image src="/hiredm-logo.png" alt="HireDM" width={24} height={24} className="rounded" />
                </div>
                <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">HireDM</h3>
              </div>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                Hiring simplified with DMs
              </p>
            </Link>
          </div>
        </div>

        {/* Writings Section */}
        <div>
          <h2 className="text-lg font-medium mb-6">What I wrote ✍️</h2>
          <MediumArticles showLatest={3} />
          <div className="mt-6 border-l border-gray-700 pl-6">
            <Link
              href="https://medium.com/@xhanthis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              Read more on Medium ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
