import type { NextPage } from "next"

import SearchSection from "@components/Page/AiPromptPage/SearchSection"
import SelectedModels from "@components/Page/AiPromptPage/SelectedModels"

const AiPrompt: NextPage = () => {
  return (
    <div className="flex-1 py-6">
      {/* search prompt */}
      <SearchSection />

      {/* list of modal */}
      <SelectedModels />
    </div>
  )
}

export default AiPrompt
