import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { searchEmployee, updateEmployee } from "../../redux/slice/organisationHierarchy.slice";
import { useCallback } from "react";

function useHierarchy() {

    const { employees, filteredEmployee } = useSelector((state: RootState) => state.employeeSlice)
    const dispatch = useDispatch()

    const updateEmployeeDetails = useCallback(({ name, email, phone, id }: { name: string, email: string, phone: string, id: number }) => {
        dispatch(updateEmployee({ id, name, email, phone }))
    }, [])

    const searchEmployeeByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchEmployee(`^${e.target.value.toLowerCase()}`))
    }

    return {
        employees,
        filteredEmployee,
        searchEmployeeByName,
        updateEmployeeDetails
    }
}

export default useHierarchy

