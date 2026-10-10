import type { NextPage } from "next"

import SearchSection from "@components/Page/AiPromptPage/SearchSection"
import SelectedModels from "@components/Page/AiPromptPage/SelectedModels"

const AiPrompt: NextPage = () => {
  return (
    <div className="flex-1 min-w-0 md:overflow-y-auto no-scrollbar">
      {/* search prompt */}
      <div className="sticky top-0 z-10 bg-bg pb-4">
        <SearchSection />
      </div>

      {/* list of modal */}
      <SelectedModels />
    </div>
  )
}

export default AiPrompt
