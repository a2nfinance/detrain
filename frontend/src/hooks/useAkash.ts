import { QueryDeploymentsResponse, QueryDeploymentsRequest, QueryClientImpl } from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import { getRpc } from "@akashnetwork/akashjs/build/rpc";
import { store } from "@/controller/store"
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
export const useAkash = () => {
    const getDeployment = async (address: string) => {
        const request = QueryDeploymentsRequest.fromJSON({
            filters: {
                owner: address
            }
        });

        const client = new QueryClientImpl(await getRpc("https://rpc.akashnet.net:443"));
        const response = await client.Deployments(request);
        // @ts-ignore
        const data: {deployments: any[], pagination: {nextKey: string, total: string}} = QueryDeploymentsResponse.toJSON(response);
        store.dispatch(setFormsProps({ att: "deployments", value: data.deployments }))
    }

    return { getDeployment }
}