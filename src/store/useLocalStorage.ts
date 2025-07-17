import { create } from "zustand"

interface LocalStorageState {
    showAlert:boolean,
    setShowAlert:(show:boolean)=>void
}

const useLocalStorage = create<LocalStorageState>((set) => ({
  showAlert:true,
  setShowAlert:(show)=>{
    set({showAlert:show})
  }
}));

export { useLocalStorage }