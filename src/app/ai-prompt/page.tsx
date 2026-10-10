import type { NextPage } from "next"

import SearchSection from "@components/Page/AiPromptPage/SearchSection"
import SelectedModels from "@components/Page/AiPromptPage/SelectedModels"

const AiPrompt: NextPage = () => {
  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center md:ml-6 overflow-hidden relative">
      {/* Background elements for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>

      <div className="glass-strong shadow-2xl rounded-3xl w-full h-full p-6 md:p-8 pb-3 overflow-y-scroll no-scrollbar border border-white/5 relative z-10">
        {/* search prompt */}
        <div className="max-w-4xl mx-auto w-full mb-8">
          <SearchSection />
        </div>

        {/* list of modal */}
        <SelectedModels />
      </div>
    </div>
  )
}

export default AiPrompt
