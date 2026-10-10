// default library
import type { NextPage } from "next"

// search page
import SearchSection from "@components/Page/HomePage/SearchSection"

const Home: NextPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Compare models</h1>
      <p className="text-muted mb-6">Choose one or more models, write a prompt, and read the answers side by side.</p>
      <SearchSection />

      <section className="mt-14 max-w-2xl">
        <h2 className="text-sm font-medium mb-2">About ModelArena</h2>
        <p className="text-sm text-muted leading-relaxed">
          ModelArena is a small playground for trying the same prompt on several open-source language models
          at once. Answers are fetched from the models through the Hugging Face Inference API, so you can see
          how each one responds and how many tokens it used before deciding which to build with.
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted list-disc pl-5">
          <li>Pick any combination of models from the selector in the prompt bar.</li>
          <li>Each model answers in its own card, with the token count shown next to its name.</li>
          <li>Use &ldquo;Continue chat&rdquo; on a card to keep talking to just that model.</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
