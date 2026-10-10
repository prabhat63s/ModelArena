// default library
import type { NextPage } from "next"

// search page
import SearchSection from "@components/Page/HomePage/SearchSection"
import Suggestions from "@components/Page/HomePage/Suggestions"

const Home: NextPage = () => {
  return (
    <div className="flex-1 min-w-0 flex flex-col justify-center py-10 md:py-0 md:overflow-y-auto no-scrollbar">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
          What do you want to compare?
        </h1>

        <p className="text-muted mb-6">
          Pick models on the left, then run one prompt against all of them.
        </p>

        <SearchSection />

        <Suggestions />
      </div>
    </div>
  )
}

export default Home
