import { useContext } from "react"
import { AdminContext } from "./AdminContext"

export default function useAdminContext () {
    try {
       const data = useContext(AdminContext) 
       return data
    } catch (error) {
        return {addedComponents:[], onUpdateComponents:()=>{}}
    }
}