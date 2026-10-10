// default library
import type { NextPage } from "next"

// search page
import SearchSection from "@components/Page/HomePage/SearchSection"
import Suggestions from "@components/Page/HomePage/Suggestions"

const Home: NextPage = () => {
  return (
    <div className="flex-1 min-w-0 flex flex-col items-center justify-center py-10 md:py-0 md:overflow-y-auto no-scrollbar">
      <div className="w-full max-w-3xl animate-rise">
        <p className="eyebrow mb-5">Multi-model playground</p>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mb-5">
          One prompt.<br />
          <span className="text-muted">Every model. Side by side.</span>
        </h1>

        <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed mb-10">
          Send the same question to several open models at once and compare their answers and token usage.
        </p>

        <SearchSection />

        <Suggestions />
      </div>
    </div>
  )
}

export default Home
