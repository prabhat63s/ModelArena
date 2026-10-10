// default library
import type { NextPage } from "next"

// search page
import SearchSection from "@components/Page/HomePage/SearchSection"

const Home: NextPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center pb-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Compare models</h1>
      <p className="text-muted mb-6">Choose one or more models, write a prompt, and read the answers side by side.</p>
      <SearchSection />
    </div>
  )
}

export default Home
