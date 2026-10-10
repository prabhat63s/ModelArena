"use client"
import * as React from "react"
// redux
import { useSelector, useDispatch } from "react-redux"
import * as AiModelReducer from "@redux/reducers/AiModelReducer"
// all modal data
import { allAiModel } from "@config/aiModelData"
// custom component
import Image from "@commonElements/Image"
import SelectAllSection from "./SelectAllSection"
import ModelListSection from "./ModelListSection"

// model selector that lives inside the prompt input box
type Props = {
  openUp?: boolean // open the list above the input instead of below
}

const ModelPicker: React.FC<Props> = ({ openUp = false }: Props) => {
  const dispatch = useDispatch()
  const aiModal = useSelector(AiModelReducer.getAiModels) // fetch the data from redux
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // close the list on outside click or Escape
  React.useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (e: MouseEvent): void => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

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
        updatedModels.forEach((model) => {
          dispatch(AiModelReducer.addAiModel(model.id))
        })
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

  const selectedCount = aiModal.length
  const label = !mounted
    ? "Models"
    : selectedCount === 0
      ? "Select models"
      : selectedCount === 1
        ? aiModal[0].name
        : `${selectedCount} models`

  return (
    <div ref={rootRef} className="relative shrink-0 flex">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-3.5 text-sm text-ink border-r border-line/15 rounded-l-lg hover:bg-raised transition-colors cursor-pointer"
      >
        {mounted && selectedCount > 0 && (
          <span className="flex -space-x-1.5">
            {aiModal.slice(0, 3).map((m) => (
              <Image
                key={m.id}
                src={m.image}
                alt={m.name}
                attrBtn={{ width: 18, height: 18, className: "rounded-full ring-2 ring-surface bg-black" }}
              />
            ))}
          </span>
        )}
        <span className="max-w-28 sm:max-w-40 truncate">{label}</span>
        <svg
          className={`w-3 h-3 text-muted transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className={`absolute left-0 ${openUp ? "bottom-full mb-2" : "top-full mt-2"} z-30 w-72 max-w-[85vw] text-sm bg-surface rounded-lg shadow-xl border border-line/15 overflow-hidden`}
        >
          {/* select all check-box */}
          <SelectAllSection isSelectedAll={isAllSelected} onHandleChange={onHandleSelectedAll} />

          <ModelListSection aiModal={aiModal} onHandleClick={onHandleClick} />
        </ul>
      )}
    </div>
  )
}

export default ModelPicker
