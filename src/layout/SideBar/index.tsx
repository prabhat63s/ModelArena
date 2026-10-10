"use client"
import * as React from "react"
// redux
import { useSelector, useDispatch } from "react-redux"
import * as AiModelReducer from "@redux/reducers/AiModelReducer"
// all modal data
import { allAiModel } from "@config/aiModelData"
// custom section
import SelectAllSection from "./SelectAllSection"
import ModelListSection from "./ModelListSection"
import { useState } from "react"

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const aiModal = useSelector(AiModelReducer.getAiModels) //fetch the data form redux
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // check if all ai model is selected or not
  const isAllSelected = allAiModel.length === aiModal.length

  // handle click event for ai model checkbox
  const onHandleClick = (id: number): void => {
    if (!isAllSelected) {
      // check the modal is selected or not
      const isExist = aiModal.some((e) => e.id === id)

      if (isExist) {
        // Find the model to remove and filter it out
        const updatedModels = aiModal.filter((model) => model.id !== id)
        dispatch(AiModelReducer.removeAllAiModel()) // Clear current selection

        // If there are still models selected, add them back
        if (updatedModels.length > 0) {
          updatedModels.forEach((model) => {
            dispatch(AiModelReducer.addAiModel(model.id))
          })
        }
      } else {
        dispatch(AiModelReducer.addAiModel(id)) // add the selected modal
      }
    } else {
      dispatch(AiModelReducer.removeAllAiModel()) // remove all the selected modal
      dispatch(AiModelReducer.addAiModel(id)) // add the selected modal
    }
  }

  // handle click event for select all checkbox
  const onHandleSelectedAll = (): void => {
    if (!isAllSelected) {
      dispatch(AiModelReducer.addAllAiModel()) // add all selected modal
    } else {
      dispatch(AiModelReducer.removeAllAiModel()) // remove all selected modal
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Count selected models
  const selectedCount = aiModal.length

  return (
    <aside className="w-full md:w-64 shrink-0 md:overflow-y-auto no-scrollbar">
      {/* Mobile dropdown button */}
      <div className="md:hidden w-full">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium bg-surface hairline rounded-xl"
        >
          <span>
            Models <span className="font-mono text-muted">{mounted ? `${selectedCount}/${allAiModel.length}` : ""}</span>
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      {/* Desktop title (hidden on mobile) */}
      <div className="hidden md:flex items-baseline justify-between mb-3 px-1">
        <h3 className="eyebrow">Models</h3>
        <span className="eyebrow">{mounted ? `${selectedCount}/${allAiModel.length}` : ""}</span>
      </div>

      {/* Model list - shown as dropdown on mobile, always visible on desktop */}
      <ul
        className={`${isDropdownOpen ? "block" : "hidden"} md:block w-full mt-2 md:mt-0 bg-surface hairline rounded-xl overflow-hidden`}
      >
        {mounted ? (
          <>
            {/* select all check-box */}
            <SelectAllSection isSelectedAll={isAllSelected} onHandleChange={onHandleSelectedAll} />

            <ModelListSection aiModal={aiModal} onHandleClick={onHandleClick} />
          </>
        ) : (
          <div className="p-4 flex justify-center">
            <span className="loading loading-spinner loading-sm text-muted"></span>
          </div>
        )}
      </ul>
    </aside>
  )
}

export default Sidebar
