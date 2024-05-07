import { FormComponents } from "@/components/FormComponents";
import { GitConfig } from "@/components/settings/GitConfig";
import { NodesConfig } from "@/components/settings/NodesConfig";
import { ParallelTypes } from "@/components/settings/ParallelTypes";
import { Review } from "@/components/settings/Review";
import { SetupSteps } from "@/components/settings/SetupSteps";
import { useAppSelector } from "@/controller/hooks";
import { useDB } from "@/hooks/useDB";
import { Col, Row, Space } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ID() {
    const {getPipelineByOwnerAndId} = useDB();
    const [loading, setLoading] = useState(true)
    
    const {id} = useRouter().query;
    useEffect(() => {
        if (id) {
            getPipelineByOwnerAndId(id.toString()).then(() => setLoading(false))
        }
    }, [id])
    
    return (
        !loading && <FormComponents />
        
    )
}