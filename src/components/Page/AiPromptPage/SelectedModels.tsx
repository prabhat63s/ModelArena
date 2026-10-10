"use client"
import * as React from "react"
import { useSelector } from "react-redux"

// redux reducer
import { getAiModels } from "@redux/reducers/AiModelReducer"
import { getAiPrompt } from "@redux/reducers/AiPromptReducer"
import { getAuthentication } from "@redux/reducers/AuthReducer"

import ResponseSection from "./ResponseSection"

const SelectedModels: React.FC = () => {
  const aiModal = useSelector(getAiModels) // fetch data form redux
  const aiPrompt = useSelector(getAiPrompt) // fetch data form redux
  const auth = useSelector(getAuthentication) // get authentication
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pb-6">
      {mounted && auth.isAuthenticated &&
        aiModal.map((ele) => <ResponseSection aiModal={ele} prompt={aiPrompt.prompt} key={ele.id} />)}
    </div>
  )
}

export default SelectedModels
