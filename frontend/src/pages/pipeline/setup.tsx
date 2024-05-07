import { FormComponents } from "@/components/FormComponents";
import { useAppDispatch } from "@/controller/hooks";
import { initialState, setFormsState } from "@/controller/setup/setupFormsSlice";
import { useEffect } from "react";

export default function Setup() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setFormsState(initialState))
    }, [])
    return (
        <FormComponents/>
    )
}