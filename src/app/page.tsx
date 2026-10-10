// default library
import type { NextPage } from "next"

// search page
import SearchSection from "@components/Page/HomePage/SearchSection"

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCode, faCommentDots, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

const Home: NextPage = () => {
  return (
    <>
      <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center md:ml-6 overflow-hidden">

        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl mix-blend-screen animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl mix-blend-screen animate-pulse-slow animation-delay-2000 pointer-events-none"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-[10%] text-white/10 animate-float pointer-events-none hidden md:block">
          <FontAwesomeIcon icon={faImage} size="4x" />
        </div>
        <div className="absolute bottom-32 right-[10%] text-white/10 animate-float animation-delay-2000 pointer-events-none hidden md:block">
          <FontAwesomeIcon icon={faCode} size="4x" />
        </div>
        <div className="absolute top-32 right-[15%] text-white/10 animate-float animation-delay-4000 pointer-events-none hidden md:block">
          <FontAwesomeIcon icon={faCommentDots} size="4x" />
        </div>
        <div className="absolute bottom-20 left-[15%] text-white/10 animate-float animation-delay-2000 pointer-events-none hidden md:block">
          <FontAwesomeIcon icon={faWandMagicSparkles} size="4x" />
        </div>

        <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight leading-tight">
            What would you <br className="hidden md:block" />
            <span className="text-gradient">want to know?</span>
          </h2>

          <p className="text-center text-gray-400 mb-12 text-lg md:text-xl max-w-2xl leading-relaxed">
            Unleash the power of multi-modal AI. Ask questions, generate code, create images, and explore new possibilities.
          </p>

          <div className="w-full max-w-2xl relative z-20">
            <SearchSection />
          </div>

          {/* Quick Suggestions */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 opacity-0 animate-[fadeIn_1s_ease-in_forwards] animation-delay-500" style={{ animationFillMode: 'forwards' }}>
            {['Generate a React component', 'Explain Quantum Physics', 'Write a poem about AI', 'Debug this code', 'Create a logo'].map((tag) => (
              <span key={tag} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/5 text-sm text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
