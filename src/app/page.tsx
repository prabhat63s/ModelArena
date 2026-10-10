// default library
import type { NextPage } from "next"
import Image from "next/image"

// config
import { allAiModel } from "@config/aiModelData"

// search page
import SearchSection from "@components/Page/HomePage/SearchSection"
import Examples from "@components/Page/HomePage/Examples"

const STEPS = [
  {
    title: "Choose your models",
    text: "Open the selector in the prompt bar and tick one model or all of them.",
  },
  {
    title: "Send one prompt",
    text: "The same message goes to every selected model at the same time.",
  },
  {
    title: "Compare the answers",
    text: "Each model replies in its own card with its token count. Continue the chat with any one of them.",
  },
]

const Home: NextPage = () => {
  return (
    <div className="flex-1">
      {/* hero */}
      <section className="relative pt-16 pb-14 md:pt-24">
        <div className="dot-grid absolute inset-x-0 -top-px h-96 pointer-events-none" aria-hidden></div>

        <div className="relative max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Same prompt, different models.
            <span className="block text-muted">See which one answers best.</span>
          </h1>

          <p className="mt-5 max-w-xl text-muted leading-relaxed">
            ModelArena is a playground for running one prompt against several open-source language models
            at once, so you can compare their answers and token usage before choosing one to build with.
          </p>

          <div className="mt-8">
            <SearchSection />
            <Examples />
          </div>
        </div>
      </section>

      {/* models */}
      <section className="py-10 border-t border-line/10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-medium">Available models</h2>
          <span className="text-sm text-muted">{allAiModel.length} models via Hugging Face</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line/10 border border-line/10 rounded-lg overflow-hidden">
          {allAiModel.map((m) => (
            <li key={m.id} className="bg-bg p-4">
              <Image src={m.image} alt="" width={24} height={24} className="rounded-full mb-3" />
              <p className="font-medium">{m.name}</p>
              <p className="mt-0.5 text-xs text-muted break-all">{m.model}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* how it works */}
      <section id="how-it-works" className="py-10 border-t border-line/10 scroll-mt-14">
        <h2 className="font-medium mb-4">How it works</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line/10 border border-line/10 rounded-lg overflow-hidden">
          {STEPS.map((step, i) => (
            <li key={step.title} className="bg-bg p-5">
              <span className="text-sm text-accent tabular-nums">0{i + 1}</span>
              <p className="mt-2 font-medium">{step.title}</p>
              <p className="mt-1 text-sm text-muted leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* footer */}
      <footer className="py-8 border-t border-line/10 text-sm text-muted flex flex-wrap justify-between gap-2">
        <span>ModelArena</span>
        <span>Built with Next.js and the Hugging Face Inference API</span>
      </footer>
    </div>
  )
}

export default Home
