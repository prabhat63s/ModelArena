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
    <div className="w-full md:w-64 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
      {/* Mobile dropdown button */}
      <div className="md:hidden w-full mb-4">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center p-4 text-sm font-medium text-white glass-strong rounded-2xl shadow-lg border border-white/10"
        >
          <span className="text-gradient font-bold">
            Select AI Model {mounted ? `(${selectedCount} selected)` : ""}
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
      <h3 className="mb-6 font-bold text-xl hidden md:block">
        <span className="text-gradient">Select AI Model</span>
      </h3>

      {/* Model list - shown as dropdown on mobile, always visible on desktop */}
      <ul
        className={`${isDropdownOpen ? "block" : "hidden"} md:block w-full text-sm font-medium text-gray-200 glass-strong rounded-3xl shadow-xl border border-white/5 overflow-hidden`}
      >
        {mounted ? (
          <>
            {/* select all check-box */}
            <SelectAllSection isSelectedAll={isAllSelected} onHandleChange={onHandleSelectedAll} />

            <ModelListSection aiModal={aiModal} onHandleClick={onHandleClick} />
          </>
        ) : (
          <div className="p-4 flex justify-center">
            <span className="loading loading-spinner loading-sm text-primary/50"></span>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
