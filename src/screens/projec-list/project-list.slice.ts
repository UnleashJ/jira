import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActons = projectListSlice.actions

// 此处state是根状态
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
