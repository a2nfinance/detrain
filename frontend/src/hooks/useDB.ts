import { useAppDispatch, useAppSelector } from "@/controller/hooks"
import { setList } from "@/controller/pipeline/pipelineSlice";
import { setFormsProps, setFormsState } from "@/controller/setup/setupFormsSlice";
import { useChain } from "@cosmos-kit/react-lite"

export const useDB = () => {
    const data = useAppSelector(state => state.setupForms)
    const { address } = useChain("akash");
    const dispatch = useAppDispatch();
    const savePipeline = async () => {
        if (!address) return;
        if (data.id) {
            let updatedReq = await fetch("/api/db/pipeline/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ state: data, owner: address, _id: data.id })
            })
        } else {
            let savedReq = await fetch("/api/db/pipeline/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ state: data, owner: address })
            })
            let savedPl = await savedReq.json();
            dispatch(setFormsProps({ att: "id", value: savedPl._id }))

        }
    }

    const getPipelineByOwner = async () => {
        if (address) {
            //get here
            let getReq = await fetch("/api/db/pipeline/getList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner: address })
            })
            // dispatch here
            const pl = await getReq.json();
            console.log(pl, address)
            dispatch(setList(pl))
        }
    }
    const getPipelineByOwnerAndId = async (id: string) => {
        if (address) {
            //get here
            let getReq = await fetch("/api/db/pipeline/getByCreatorAndId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: id, owner: address })
            })
            // dispatch here
            const pl = await getReq.json();
            dispatch(setFormsState({ ...pl.state, id: id }))
        }
    }
    return { savePipeline, getPipelineByOwner, getPipelineByOwnerAndId }
}